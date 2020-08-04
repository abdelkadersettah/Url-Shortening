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
    console.log('great');
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
inputBtn.addEventListener('click', (e) => {
  e.preventDefault();
  const input = document.querySelector('.input-group__input');
  const errorMsg = document.querySelector('.input-group__input--error');
  if (!input.value) {
    input.classList.add('input-group__input--not-valid');
    errorMsg.style.display = 'block';
  } else {
    input.classList.remove('input-group__input--not-valid');
    errorMsg.style.display = 'none';
    const shortenLink = fetchNewLink(input.value);
    shortenLink.then((data) => renderShortLink(data));
    input.value = '';
  }
});

//get shorten link

//  XMLHttpRequest method
// function postRequest() {
//   return new Promise((resolve, reject) => {
//     var http = new XMLHttpRequest();
//     var url = 'https://rel.ink/api/links/';
//     var params = {
//       url: 'https://www.google.com/',
//     };

//     http.open('POST', url);

//     //Send the proper header information along with the request
//     http.setRequestHeader('Content-type', 'application/json');

//     http.onload = function () {
//       //Call a function when the state changes.
//       if (http.readyState === 4) {
//         resolve(JSON.parse(http.responseText));
//       } else {
//         reject(Error, 'cant get data');
//       }
//     };
//     http.send(JSON.stringify(params));
//   })
//     .then((data) => console.log(data))
//     .catch((err) => console.log(err));
// }
// postRequest();

function postLink(input) {
  return fetch('https://rel.ink/api/links/', {
    method: 'POST',
    body: JSON.stringify({
      url: input,
    }),
    headers: {
      'Content-type': 'application/json',
    },
  }).then((response) => response.json());
}

async function fetchNewLink(url) {
  let newLinkJson = await postLink(url);
  return newLinkJson;
}
function renderShortLink(data) {
  const outputGroup = document.querySelector('.output-group');
  outputGroup.innerHTML += `
  <ul class="output-group__list">
      <li class="output-group__item">${data.url}</li>
      <li class="output-group__item">https://rel.ink/${data.hashid}</li>
      <li class="output-group__cta output-group__cta--copied btn btn--secondary">copy</li>
  </ul> 
    `;
}
