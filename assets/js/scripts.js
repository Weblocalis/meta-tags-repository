// Load JSON file dynamically and inject content
fetch('data/meta-tags.json')
  .then(response => response.json())
  .then(data => {
    const metaContent = document.getElementById('meta-content');
    const metaTypes = data.metaTypes;
    let isFirstSection = true;

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

            const collapseClass = isFirstSection ? 'collapse show' : 'collapse';
            isFirstSection = false;

            return `
              <div class="col-12">
                <h2>
                  <button class="btn btn-primary w-100 text-start" type="button" data-bs-toggle="collapse" data-bs-target="#${tag.attribute.replace(/\./g, '')}Details" aria-expanded="true" aria-controls="${tag.attribute.replace(/\./g, '')}Details">
                    Meta Tag: ${tag.attribute}
                  </button>
                </h2>
                <div id="${tag.attribute.replace(/\./g, '')}Details" class="${collapseClass}">
                  <div class="row">
                    <div class="col-md-6">
                      <div class="card meta-card mb-4">
                        <div class="card-body">
                          <h5 class="card-title">Description</h5>
                          <p class="card-text">${tag.description || 'No description available.'}</p>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card meta-card mb-4">
                        <div class="card-body">
                          <h5 class="card-title">Compatibilité</h5>
                          ${tag.compatibility.map(browser => `<span class="badge bg-success me-1">${browser}</span>`).join('')}
                          <h6 class="mt-3">Incompatibilité :</h6>
                          ${tag.incompatibility.map(browser => `<span class="badge bg-danger me-1">${browser}</span>`).join('')}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card meta-card mb-4">
                        <div class="card-body">
                          <h5 class="card-title">Exemple d'utilisation</h5>
                          ${tag.examples.map(example => `<pre class="code-block bg-light p-3">${example}</pre>`).join('')}
                        </div>
                      </div>
                    </div>
                    <div class="col-md-6">
                      <div class="card meta-card mb-4">
                        <div class="card-body">
                          <h5 class="card-title">Informations supplémentaires</h5>
                          <ul>
                            <li><strong>Créateur :</strong> ${tag.creator}</li>
                            <li><strong>Catégorie :</strong> ${tag.category}</li>
                            <li><strong>Impact SEO :</strong> ${tag.seo_impact}</li>
                            <li><strong>Contraintes de valeur :</strong> ${tag.value_constraints}</li>
                          </ul>
                        </div>
                      </div>
                    </div>
                    <div class="col-md-12">
                      <div class="card meta-card mb-4">
                        <div class="card-body">
                          <h5 class="card-title">Notes et Conseils</h5>
                          <ul>
                            ${tag.usage_notes ? `<li>${tag.usage_notes}</li>` : ''}
                            ${tag.common_mistakes ? `<li><strong>Erreurs courantes :</strong> ${tag.common_mistakes.join(', ')}</li>` : ''}
                            ${tag.performance_tips ? `<li><strong>Conseils de performance :</strong> ${tag.performance_tips}</li>` : ''}
                          </ul>
                        </div>
                      </div>
                    </div>
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

// Search functionality
const searchInput = document.getElementById('search-input');
searchInput.addEventListener('input', () => {
  const query = searchInput.value.toLowerCase();
  document.querySelectorAll('.meta-card').forEach(card => {
    const title = card.querySelector('.card-title').textContent.toLowerCase();
    card.style.display = title.includes(query) ? '' : 'none';
  });
});




