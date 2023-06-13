let language = 'en'; // Default language is English

const switchLanguage = () => {
  const languageButton = document.getElementById('language-button');
  if (language === 'en') {
    language = 'gr';
    languageButton.classList.remove('flag-icon-gb');
    languageButton.classList.add('flag-icon-gr');
  } else {
    language = 'en';
    languageButton.classList.remove('flag-icon-gr');
    languageButton.classList.add('flag-icon-gb');
  }
  
  const elements = document.querySelectorAll('[data-en]');
  elements.forEach(el => {
    el.innerText = el.getAttribute(`data-${language}`);
  });
}

window.onload = () => {
  document.getElementById('language-button').addEventListener('click', switchLanguage);
};
