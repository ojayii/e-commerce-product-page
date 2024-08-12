const decrementBtn = document.querySelector('.decrement-btn');
const incrementBtn = document.querySelector('.increment-btn');
const counterValue = document.querySelector('.counter-value');
const lightBox = document.querySelector('.light-box');
const lightBoxToggle = document.querySelector('button.product-item__images__preview');
const lightBoxClose = document.querySelector('.light-box__close');

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.mjs';

decrementBtn.addEventListener('click', () => {
    const value = parseInt(counterValue.value, 10);
    if (value > 0) {
        counterValue.value = value - 1;
    }
});

incrementBtn.addEventListener('click', () => {
    const value = parseInt(counterValue.value, 10);
    counterValue.value = value + 1;
});

const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
  
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

});


lightBoxToggle.addEventListener('click', () => {
    if (screen.width > 768) {
        console.log("...");
        lightBox.style.transition = 'scale 300ms ease-in-out';
        lightBox.style.scale= '1';
    }
})

lightBoxClose.addEventListener('click', () => {
    console.log("closing...");
    lightBox.style.transition = '';
    lightBox.style.scale= '';
})