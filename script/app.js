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
  }
});
