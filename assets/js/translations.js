let currentLanguage = "fr"; // Langue par défaut

// Fonction pour charger les traductions
async function loadTranslations(language) {
  const response = await fetch(`locales/${language}.json`);
  const translations = await response.json();
  applyTranslations(translations);
}

// Appliquer les traductions dans le DOM
function applyTranslations(translations) {
  // Exemple d'application
  document.querySelector("#header-title").innerText = translations.header.title;
  document.querySelector("#language-selector").ariaLabel = translations.header.languageSelector;
  document.querySelector("#generate-btn").innerText = translations.buttons.generate;
  document.querySelector("#copy-btn").innerText = translations.buttons.copy;
  document.querySelector("#github-link").innerText = translations.buttons.viewOnGitHub;

  // Footer
  document.querySelector("#footer-contact").innerText = translations.footer.contact;
  document.querySelector("#footer-privacy").innerText = translations.footer.privacyPolicy;
  document.querySelector("#footer-contribute").innerText = translations.footer.contribute;
}

// Gestion du changement de langue
document.querySelector("#language-selector").addEventListener("change", (e) => {
  currentLanguage = e.target.value;
  loadTranslations(currentLanguage);
});

// Charger la langue par défaut
loadTranslations(currentLanguage);