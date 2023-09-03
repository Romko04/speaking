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
  if (isModalOpen && event.target.classList.contains('modal') | event.target.classList.contains('close')) {
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
  const expert = item.querySelector('.swiper__content-expert').textContent
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
            <span class="swiper__content-name">${name}</span> 
            <span class="swiper__content-expert">${expert}</span> 
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
  if (heightText > 236) {
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


/*Безкінечний таймер */
// Определяем действующие элементы на странице
const year = document.querySelector('#year');
const days = document.querySelector('#days');
const hours = document.querySelector('#hours');
const minutes = document.querySelector('#minutes');
const seconds = document.querySelector('#seconds');
const countdown = document.querySelector('#countdown');
const preloader = document.querySelector('#preloader');


function updateCounter() {
  const startDate = new Date('2023-08-10');
  const currentDate = new Date()
  const currentHour = currentDate.getHours();
  const currentMinute = currentDate.getMinutes();
  const currentSecond = currentDate.getSeconds();

  const dateDiffInSeconds = currentDate - startDate // від 1 дати віднімає теперішню

  const daysDiff = Math.abs(Math.floor(dateDiffInSeconds / (1000 * 60 * 60 * 24))); // вираховуєм різницю в днях

  const dayOfCycle = Math.floor(daysDiff / 3); // дивимся який період циклу

  const daysInCycleDiff = daysDiff - (dayOfCycle * 3) // вираховуєм який день циклу
  /* значення дня цикла*/
  const daysInMilliseconds = daysInCycleDiff * 24 * 60 * 60 * 1000;
  const hoursInMilliseconds = currentHour * 60 * 60 * 1000;
  const minutesInMilliseconds = currentMinute * 60 * 1000;
  const secondsInMilliseconds = currentSecond * 1000;

  const totalMilliseconds = daysInMilliseconds + hoursInMilliseconds + minutesInMilliseconds + secondsInMilliseconds; // день циклу в мілісекундах


  const diffInMilliseconds = 259200000 - totalMilliseconds;// получаєм скільки лишилось до кінця циклу

  const diffInDays = Math.floor(diffInMilliseconds / (24 * 60 * 60 * 1000));
  const diffInHours = Math.floor((diffInMilliseconds % (24 * 60 * 60 * 1000)) / (60 * 60 * 1000));
  const diffInMinutes = Math.floor((diffInMilliseconds % (60 * 60 * 1000)) / (60 * 1000));
  const diffInSeconds = Math.floor((diffInMilliseconds % (60 * 1000)) / 1000);
  
  days.innerText = '0'+ diffInDays
  hours.innerText = diffInHours < 10 ? '0' + diffInHours : diffInHours
  minutes.innerText = diffInMinutes < 10 ? '0' + diffInMinutes : diffInMinutes
  seconds.innerText = diffInSeconds < 10 ? '0' + diffInSeconds : diffInSeconds
}

// // Запускаем расчет 1 раз в секунду (каждую секунду)
setInterval(updateCounter, 1000);

setTimeout(function () {
    countdown.style.display = 'flex';
}, 1000);
