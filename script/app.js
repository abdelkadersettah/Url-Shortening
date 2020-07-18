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
