// Load JSON file dynamically and inject content
fetch('data/meta-tags.json')
  .then(response => response.json())
  .then(data => {
    const metaContent = document.getElementById('meta-content');
    const metaTypes = data.metaTypes;

    Object.keys(metaTypes).forEach(type => {
      // Create a section for each type
      const section = document.createElement('section');
      section.classList.add('meta-section');

      // Add section title
      section.innerHTML = `
        <h2>${type}</h2>
        <div class="row">
          ${metaTypes[type]
          .map(tag => {
            // Détermine le bon attribut à utiliser
            let attributeType = 'name'; // Par défaut
            if (tag.attribute.startsWith('og:') || tag.attribute.startsWith('twitter:')) {
              attributeType = 'property';
            } else if (tag.attribute.startsWith('DC.')) {
              attributeType = 'name'; // Dublin Core utilise 'name'
            } else if (tag.category === 'HTTP') {
              attributeType = 'http-equiv';
            }

            return `
                <div class="col-md-12">
                  <div class="card meta-card">
                    <div class="card-body">
                      <h5 class="card-title">${tag.attribute}</h5>
                      <p class="card-text">${tag.description || 'No description available.'}</p>
<pre class="code-block">
<span class="tag">&lt;meta</span> <span class="attribute">${attributeType}</span>=<span class="value">"${tag.attribute}"</span> 
<span class="attribute">content</span>=<span class="value">"${tag.default_value || '...'}"</span><span class="tag">&gt;</span>
</pre>
                    </div>
                  </div>
                </div>
              `;
          })
          .join('')}
        </div>
      `;

      metaContent.appendChild(section);
    });
  })
  .catch(error => console.error('Error loading meta-tags.json:', error));


const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.meta-card').forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = title.includes(query) ? '' : 'none';
  });
});




