const hamburgerBtn = document.querySelector('.hamburger-btn');

hamburgerBtn.addEventListener('click', (e) => {
  hamburgerBtn.firstElementChild.classList.toggle('is-open');
  console.log(e.target);
});
