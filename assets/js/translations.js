// Paths
const translationsPath = 'data/translations.json';
const metaDescriptionsPath = 'data/meta-tags-details.json';
const metaTagsPath = 'data/meta-tags.json';

// Language state
let currentLanguage = 'en';

// Function to load translations and update the page
async function loadTranslations() {
  try {
    const translationsResponse = await fetch(translationsPath);
    const translations = await translationsResponse.json();

    const descriptionsResponse = await fetch(metaDescriptionsPath);
    const metaDescriptions = await descriptionsResponse.json();

    updatePage(translations[currentLanguage], metaDescriptions[currentLanguage]);
  } catch (error) {
    console.error('Error loading translations or descriptions:', error);
  }
}

// Function to update the page with the selected language
function updatePage(translations, metaDescriptions) {
  // Update static texts
  document.title = translations.title;
  document.querySelector('h1').textContent = translations.title;

  // Update the placeholder for the search input
  const searchInput = document.getElementById('search-input');
  if (searchInput) {
    searchInput.setAttribute('placeholder', translations.searchPlaceholder);
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
              .map(tag => {
                const description = metaDescriptions[type][tag.attribute] || "No description available.";
                return `
                  <div class="col-md-4">
                    <div class="card meta-card">
                      <div class="card-body">
                        <h5 class="card-title">${tag.attribute}</h5>
                        <p class="card-text">${description}</p>
                        <pre class="code-block">&lt;meta ${type}="${tag.attribute}" content="..."&gt;</pre>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
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