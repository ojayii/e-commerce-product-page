const decrementBtn = document.querySelector(".decrement-btn");
const incrementBtn = document.querySelector(".increment-btn");
const counterValue = document.querySelector(".counter-value");
const lightBox = document.querySelector(".light-box");
const lightBoxToggle = document.querySelector("button.product-item__images__preview");
const lightBoxClose = document.querySelector(".light-box__close");
const addBtns = document.querySelectorAll(".add-btn");
const cartElement = document.querySelector(".cart-basket");
let cartItems = [];
let cartData;
const checkoutBtn = document.querySelector(".cart>button");
const cartCount = document.querySelector('.cart-count');
let count = 0;

import Swiper from 'https://cdn.jsdelivr.net/npm/swiper@11/swiper-bundle.min.mjs';

decrementBtn.addEventListener("click", () => {
  const value = parseInt(counterValue.value, 10);
  if (value > 0) {
    counterValue.value = value - 1;
  }
});

incrementBtn.addEventListener("click", () => {
  const value = parseInt(counterValue.value, 10);
  counterValue.value = value + 1;
});

const swiper = new Swiper('.swiper', {
    loop: true,
    slidesPerView: 1,
    spaceBetween: 10,

    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },

});

lightBoxToggle.addEventListener("click", () => {
  lightBox.style.transition = "scale 300ms ease-in-out";
  lightBox.style.scale = "1";
  // console.log("clicked")
});

lightBoxClose.addEventListener("click", () => {
  lightBox.style.transition = "";
  lightBox.style.scale = "";
});

const deleteItem = (e) => {
  cartItems = cartItems.filter((item) => item.id != e.target.closest("button").id);
  count = 0;
  cartCount.innerHTML= count;
  updateCart();
};

const updateCart = () => {
  if (cartItems.length) {
    cartElement.innerHTML = cartItems
      .map((item) => {
        return `<div class="cart-item">
          <img src="${item.thumbnailSrc}" alt="Item thumbnail" class="thumbnail">
          <div class="cart-item__info">
            <p>${item.itemTitle}</p>
            <span>$<span class="cart-item__price">${item.itemPrice}</span> x <span class="cart-item__units">${item.itemUnits}</span> <strong>$${item.itemTotal.toFixed(2)}</strong></span>
          </div>
          <button class="cart-item__detete-btn" id=${item.id}>
            <img src="./images/icon-delete.svg" alt="">
          </button>
        </div>`;
      })
      .join("");
    checkoutBtn.style.display= 'block';
    cartCount.style.display= 'block';
  } else {
    cartElement.innerHTML = `<span class="empty-state">Your cart is empty</span>`;
    checkoutBtn.style.display= '';
    cartCount.style.display= '';
  }

};

updateCart();

const filterCartItems = () => {
  if (!cartItems.length) {
    cartItems.push(cartData);
    count = parseInt(cartData.itemUnits, 10);
    cartCount.innerHTML= count;
  } else {
    cartItems.forEach((item) => {
      if (item.id === cartData.id) {
        item.itemUnits =
          parseInt(item.itemUnits, 10) + parseInt(cartData.itemUnits, 10);
        item.itemTotal =
          parseInt(item.itemPrice, 10) * parseInt(item.itemUnits, 10);
        count = parseInt(count, 10) + parseInt(cartData.itemUnits, 10);
        cartCount.innerHTML= count;
      } else {
        cartItems.push(cartData);
        count += 1;
        cartCount.innerHTML= count;
      }
    });
  }

  updateCart();
};

const handleAdd = (e) => {
  const parent = e.target.parentElement.parentElement.parentElement;

  if (!e.target.id) {
    e.target.id = `${Date.now()}`;
  }

  cartData = {
    itemTitle: parent.querySelector(".product-item__info>h1").textContent,
    itemPrice: parent.querySelector(".price").textContent,
    itemUnits: parent.querySelector(".counter-value").value,
    thumbnailSrc: parent.querySelector('.product-item__images__thumbnail+label[for="product-image-1"]>img').getAttribute("src"),
    id: e.target.id,
  };

  cartData.itemTotal =
    parseInt(cartData.itemPrice, 10) * parseInt(cartData.itemUnits, 10);

  if (cartData.itemUnits == 0) {
    parent.querySelector(".counter-container").style.outline = "2px solid red";
  } else {
    parent.querySelector(".counter-container").style.outline = "";
    filterCartItems();
  }

  for (const child of cartElement.children) {
    if(child.children[2]) child.children[2].onclick= deleteItem
  }
};

for (const element of addBtns) {
  element.onclick = handleAdd;
}