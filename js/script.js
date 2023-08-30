/* Burger */
const menuItems = document?.querySelectorAll('.header__menu-items');
const burger = document?.querySelector('.header__burger');
const menu = document?.querySelector('.menu__body');
const body = document?.querySelector('body');

const cases = document?.querySelectorAll('.swiper-slide');
const modal = document?.querySelector('.modal');
const btn = document?.querySelector('.closeModalBtn');

let isModalOpen = false

window.addEventListener('click', (event) => {
  if (isModalOpen && !event.target.classList.contains('modal-content')|event.target.classList.contains('closeModalBtn')){
    closeModal()
  }
});

new Swiper('.swiper', {
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



/*

-Модалка

*/

const openModal = (item) => {
  const name = item.querySelector('.swiper__content-name').textContent
  const text = item.querySelector('.swiper__content-text').textContent
  const imgUrl = item.querySelector('.swiper__content-img').src;

  document.body.classList.add('body-block');

  modal.style.display = 'block';
  isModalOpen = true
  modal.classList.add('fadeIn'); // Додаємо клас анімації
  // Додати вміст до модального вікна
  const modalContent = `
    <div class="modal-content">
      <span id="closeModalBtn" class="close">&times;</span>
      <div class="modal__content-top">
        <img class="swiper__content-img" src="${imgUrl}" alt="image">
        <div class="modal__content-top__text">
            <span class="name">${name}</span> 
            <span class="expert">${name}</span> 
        </div>                
      </div>
      <p class="modal-content-text">${text}</p>
    </div>
  `;
  modal.innerHTML = modalContent;

}

const closeModal = () => {
  modal.style.display = 'none';
  modal.classList.remove('fadeIn'); // Додаємо клас анімації
  document.body.classList.remove('body-block');
}


// ... інший код ...


for (let item = 0; item < cases.length; item++) {
  const slideText = cases[item].querySelector('.swiper__content-text')
  const slideBtn = cases[item].querySelector('.swiper__content-read')
  const heightText = slideText.offsetHeight;
  if (heightText > 174) {
    slideText.classList.add('gradient-overlay');
    cases[item].style.cursor = 'pointer';
    
    // Зберігаємо посилання на елемент cases[item]
    const currentCase = cases[item];
    cases[item].addEventListener('click', (e) => {
      e.stopPropagation();
      if (currentCase.contains(e.target)) {
        activeSlide = e.target
        openModal(cases[item]);
      }
    });
    
  } else {
    slideBtn.classList.add('no-btn');
    slideText.style.paddingBottom = '25.9px';
  }
}



