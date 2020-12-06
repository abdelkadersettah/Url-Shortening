// display hamburger button

const hamburgerBtn = document.querySelector('.hamburger-btn');

hamburgerBtn.addEventListener('click', (e) => {
  const btnClassName = hamburgerBtn.firstElementChild.classList;
  const mainNav = document.querySelector('.main-nav');
  btnClassName.toggle('is-open');
  if (btnClassName.contains('is-open')) {
    mainNav.style.display = 'block';
  } else {
    mainNav.style.display = 'none';
  }
});

document.addEventListener('click', (e) => {
  const btnClassName = hamburgerBtn.firstElementChild.classList;
  const mainNav = document.querySelector('.main-nav');
  let classNameArr = e.target.className.split('__');
  if (btnClassName.contains('is-open')) {
    if (
      !classNameArr.includes('main-nav') &&
      !classNameArr.includes('hamburger-btn')
    ) {
      mainNav.style.display = 'none';
      btnClassName.remove('is-open');
    }
  }
});

// add class to input if the user don't write the url
const inputBtn = document.querySelector('.input-group__submit');
inputBtn.addEventListener('click', async (e) => {
  e.preventDefault();
  const input = document.querySelector('.input-group__input');
  const errorMsg = document.querySelector('.input-group__input--error');
  if (!input.value) {
    input.classList.add('input-group__input--not-valid');
    errorMsg.style.display = 'block';
  } else {
    input.classList.remove('input-group__input--not-valid');
    errorMsg.style.display = 'none';
    const shortenLink = await fetchNewLink(input.value);
    renderShortLink(shortenLink);
    copyLink();

    input.value = '';
  }
});

// fetch shortet link
let postLink = (url) => {
  return fetch(`https://api.shrtco.de/v2/shorten?url=${url}`, {
    method: 'POST',
    body: JSON.stringify(),
  });
};

async function fetchNewLink(url) {
  let newLinkResponse = await postLink(url);
  let response = await newLinkResponse.json();
  let linkResult = await response.result;

  return { code: linkResult.code, shortLink: linkResult.full_short_link };
}
function renderShortLink(data) {
  const outputGroup = document.querySelector('.output-group');
  const markup = `
  <ul class="output-group__list">
      <li class="output-group__item">${data.code}</li>
      <li class="output-group__item">${data.shortLink}</li>
      <li class="output-group__cta btn btn--secondary">copy</li>
  </ul> 
    `;
  outputGroup.insertAdjacentHTML('afterbegin', markup);
}

// copy the clicked short link
function copyLink() {
  const copyBtn = document.querySelectorAll('.output-group__cta');
  copyBtn.forEach((btn) => {
    btn.addEventListener('click', (e) => {
      btn.classList.toggle('output-group__cta--copied');
      btn.textContent = 'Copied!';

      // create select range
      var range = document.createRange();
      // link that got copy
      var linkClicked = btn.previousElementSibling;
      // select url clicked
      range.selectNodeContents(linkClicked);
      // get selection
      var sel = window.getSelection();
      sel.removeAllRanges();
      sel.addRange(range);
      document.execCommand('copy');
      // remove selection
      sel.removeAllRanges();
    });
  });
}
