import Swal from "sweetalert2";
import {
  app,
  cartCount,
  cartCountBadge,
  cartItems,
  cartTotalAmount,
} from "../core/selectors";
import { removeCartAddedBtn } from "./product";

export const createCart = ({ id, image, title, price }) => {
  const cart = document.createElement("div");
  cart.classList.add("cart-item");
  cart.setAttribute("product-id", id);
  cart.innerHTML = `
    <div class="group mb-5">
    <img
      src="${image}"
      class="h-[80px] mb-[-40px] ps-3 relative z-10"
      alt=""
    />
    <div class="flex flex-col border border-indigo-700 p-3 pt-12 relative">
    <button class="delete-cart-btn absolute top-3 right-3 opacity-0 group-hover:opacity-100 duration-200 translate-x-10 group-hover:translate-x-0">
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-6 h-6 stroke-green-700">
  <path stroke-linecap="round" stroke-linejoin="round" d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0" />
    </svg>
    </button>
      <h5 class="font-heading text-indigo-700 font-bold line-clamp-1 mb-3">${title}</h5>
      <div class="flex justify-between  items-center">
      <p class='hidden'>Price : $ <span class='original-price'>${price}</span></p>
        <p class="text-indigo-400">$<span class="cart-cost">${price}</span></p>
        <div
          class="flex justify-between items-center w-[120px] bg-indigo-100"
        >
          <button class="px-1 py-2 bg-indigo-300 cart-q-decrement">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M18 12H6" />
            </svg>
            
          </button>
          <p class="flex-grow text-end pe-2 cart-q">1</p>
          <button class="px-1 py-2 bg-indigo-300 cart-q-increment">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-4 h-4">
              <path stroke-linecap="round" stroke-linejoin="round" d="M12 6v12m6-6H6" />
            </svg>
            
          </button>
        </div>
      </div>
    </div>
  </div>
    `;
  const deleteCartBtn = cart.querySelector(".delete-cart-btn");
  deleteCartBtn.addEventListener("click", deleteCartBtnHandler);
  const cartQuantityIncrementBtn = cart.querySelector(".cart-q-increment");
  cartQuantityIncrementBtn.addEventListener(
    "click",
    cartQuantityIncrementHandler
  );
  const cartQuantityDecrementBtn = cart.querySelector(".cart-q-decrement");
  cartQuantityDecrementBtn.addEventListener(
    "click",
    cartQuantityDecrementHandler
  );

  return cart;
};

export const deleteCartBtnHandler = (event) => {
  const currentCart = event.target.closest(".cart-item");
  const currentCartId = currentCart.getAttribute("product-id");
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, delete it!",
  }).then((result) => {
    if (result.isConfirmed) {
      currentCart.classList.add("animate__animated", "animate__fadeOutDown","animate__fast");
      currentCart.addEventListener("animationend", () => {
        currentCart.remove();
        removeCartAddedBtn(currentCartId);
        Swal.fire({
          title: "Deleted!",
          text: "Your file has been deleted.",
          icon: "success",
        });
      });
    }
  });
};

export const calculateCartTotalAmount = () => {
  const cartCosts = app.querySelectorAll(".cart-cost");
  return [...cartCosts]
    .reduce((pv, cv) => pv + parseFloat(cv.innerText), 0)
    .toFixed(2);
};

export const cartCountTotal = () => {
  const carts = app.querySelectorAll(".cart-item");
  return carts.length;
};

export const cartObserver = () => {
  const observerOptions = {
    childList: true,
    subtree: true,
  };
  const observer = new MutationObserver(() => {
    cartTotalAmount.innerText = calculateCartTotalAmount();
    cartCount.innerText = cartCountTotal();
    cartCountBadge.innerText = cartCountTotal();
  });
  observer.observe(cartItems, observerOptions);
};
export const cartQuantityDecrementHandler = (event) => {
  const currentCart = event.target.closest(".cart-item");
  const currentQuantity = currentCart.querySelector(".cart-q");
  const currentCartPrice = currentCart.querySelector(".original-price");
  const currentCartCosts = currentCart.querySelector(".cart-cost");
  if (currentQuantity.innerText > 1) {
    currentQuantity.innerText = parseInt(currentQuantity.innerText) - 1;
    currentCartCosts.innerText =
      parseFloat(currentCartPrice.innerText) *
      parseInt(currentQuantity.innerText);
  }
};
export const cartQuantityIncrementHandler = (event) => {
  const currentCart = event.target.closest(".cart-item");
  const currentQuantity = currentCart.querySelector(".cart-q");
  const currentCartPrice = currentCart.querySelector(".original-price");
  const currentCartCosts = currentCart.querySelector(".cart-cost");
  currentQuantity.innerText = parseInt(currentQuantity.innerText) + 1;
  currentCartCosts.innerText =
    parseFloat(currentCartPrice.innerText) *
    parseInt(currentQuantity.innerText);
};
