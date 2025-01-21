// Paths
const translationsPath = 'data/translations.json';
const metaTagsPath = 'data/meta-tags.json';

// Language state
let currentLanguage = 'en';

// Function to load translations and update the page
async function loadTranslations() {
  try {
    const response = await fetch(translationsPath);
    const translations = await response.json();
    updatePage(translations[currentLanguage]);
  } catch (error) {
    console.error('Error loading translations:', error);
  }
}

// Function to update the page with the selected language
function updatePage(translations) {
  // Update static texts
  document.title = translations.title;
  document.querySelector('h1').textContent = translations.title;

  // Ensure the description exists
  const descriptionElement = document.getElementById('meta-description');
  if (descriptionElement) {
    descriptionElement.textContent = translations.description;
  }

  // Update sections dynamically
  fetch(metaTagsPath)
    .then(response => response.json())
    .then(data => {
      const metaContent = document.getElementById('meta-content');
      metaContent.innerHTML = ''; // Clear current content

      Object.keys(data.metaTypes).forEach(type => {
        const section = document.createElement('section');
        section.classList.add('meta-section');
        section.innerHTML = `
          <h2>${translations.sections[type]}</h2>
          <div class="row">
            ${data.metaTypes[type]
              .map(tag => `
                <div class="col-md-4">
                  <div class="card meta-card">
                    <div class="card-body">
                      <h5 class="card-title">${tag.attribute}</h5>
                      <p class="card-text">${tag.description}</p>
                      <pre class="code-block">&lt;meta ${type}="${tag.attribute}" content="..."&gt;</pre>
                      <button class="copy-btn">${translations.copyButton}</button>
                    </div>
                  </div>
                </div>
              `).join('')}
          </div>
        `;
        metaContent.appendChild(section);
      });
    })
    .catch(error => console.error('Error loading meta-tags.json:', error));
}

// Event listener for language change
document.getElementById('language-selector').addEventListener('change', (event) => {
  currentLanguage = event.target.value;
  loadTranslations();
});

// Initial load
loadTranslations();