/* Burger */
const menuItems = document?.querySelectorAll('.header__menu-items');
const burger = document?.querySelector('.header__burger');
const menu = document?.querySelector('.menu__body');
const body = document?.querySelector('body');


new Swiper('.swiper--price', {
  slidesPerView: 1,
  spaceBetween: 35,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true'
  },
  breakpoints: {
    700: {
      slidesPerView: 2
    },
    900: {
      slidesPerView: 3
    }
  }
});
new Swiper('.swiper--reviews', {
  slidesPerView: 1,
  spaceBetween: 35,
  navigation: {
    nextEl: '.swiper-button-next',
    prevEl: '.swiper-button-prev',
  },
  pagination: {
    el: '.swiper-pagination',
    clickable: 'true',
    dynamicBullets: true,
  },
  breakpoints: {
    700: {
      slidesPerView: 2
    },
    900: {
      slidesPerView: 3
    }
  }
});

document.addEventListener('click', (e) => {
  if (e.target.classList.contains('anchor')) {
    e.preventDefault()
    anchorClick(e.target)
  }
  if (e.target.classList.contains('btn__anchor')) {
    e.preventDefault()
    anchorClick(e.target.parentNode)
  }
  if (e.target.classList.contains('header__burger')) {
    console.log(e.target);
    e.preventDefault()
    toggleMenu()
  }
})
function anchorClick(e) {
  if (menu.classList.contains('active')) {
    toggleMenu()
  }
  const blockId = e.getAttribute('href')
  document.querySelector('' + blockId).scrollIntoView({
    behavior: "smooth",
    block: "start",
    inline: "nearest"
  })
}
function toggleMenu() {
  menu.classList.toggle('active');
  burger.classList.toggle('active');
  burger.classList.contains('active') ? document.body.classList.add('scroll--block') : document.body.classList.remove('scroll--block')
}


// Отримуємо всі зображення у слайдері
const images = document.querySelectorAll('.swiper__slide-img');

// Встановлюємо бажану висоту для зображень
const desiredHeight = 300; // Ваша бажана висота

// Змінюємо розмір зображень
images.forEach(image => {
  const imgWidth = image.naturalWidth;
  const imgHeight = image.naturalHeight;

  const newWidth = (desiredHeight / imgHeight) * imgWidth;

  image.style.width = newWidth + 'px';
  image.style.height = desiredHeight + 'px';
});
