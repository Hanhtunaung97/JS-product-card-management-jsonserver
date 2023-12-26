import {
  app,
  cartBtn,
  cartCount,
  cartCountBadge,
  cartItems,
  cartTotalAmount,
  cartUi,
  productSection,
} from "../core/selectors";
import { products } from "../core/variables";
import { calculateCartTotalAmount, cartCountTotal, createCart } from "./cart";

export const productRender = (list) => {
  productSection.innerHTML = ``;
  list.forEach((el) => productSection.append(createProductCard(el)));
};
export const createRatingUi = (rate) => {
  let result = "";
  for (let i = 1; i <= 5; i++) {
    result += `
        <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 stroke-1 ${
          i <= rate.toFixed(0)
            ? "fill-indigo-700  stroke-indigo-700"
            : "fill-indigo-200  stroke-indigo-200"
        }"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z"
        />
      </svg>
        `;
  }
  return result;
};
export const createProductCard = ({
  id,
  image,
  title,
  description,
  price,
  rating: { rate, count },
}) => {
  const card = document.createElement("div");
  card.classList.add("product-card");
  card.setAttribute("data-id", id);
  const isCartItem = cartItems.querySelector(`[product-id='${id}']`);
  card.innerHTML = `
    <div class=" w-full">
    <img
      src="${image}"
      class="h-36 product-img ms-3 -mb-20"
      alt=""
    />
    <div class="product-info w-full text-indigo-700 border border-indigo-700 p-5 pt-20">
      <h5 class="font-bold text-xl line-clamp-1 font-heading mb-5">${title}</h5>
      <p class="text-sm line-clamp-3 mb-5">
       ${decodeURI}
      </p>
      <div class="rating-gp flex justify-between border-b border-indigo-700 pb-5 mb-5">
        <div class="rating-star flex ">
         ${createRatingUi(rate)}
        </div>
        <p class="">( ${rate}/${count} )</p>
      </div>
      <p class="font-heading font-bold text-2xl mb-2">$ <span>${price}</span></p>
      <button ${isCartItem && "disabled"} class="${
    isCartItem && "bg-indigo-700 text-white border-white"
  } add-to-cart-btn border font-heading border-indigo-700 p-3 w-full block text-indigo-700">${
    isCartItem ? "Added" : "Add to Cart"
  }</button>

    </div>
  </div>
    
    `;
  const addToCartBtn = card.querySelector(".add-to-cart-btn");
  addToCartBtn.addEventListener("click", addToCartBtnHandler);
  return card;
};

export const setCartAddedBtn = (id) => {
  const btn = app.querySelector(`[data-id='${id}'] .add-to-cart-btn`);
  btn.innerText = "Added";
  btn.toggleAttribute("disabled");
  btn.classList.add("bg-indigo-700", "text-white", "border-white");
};

export const removeCartAddedBtn = (id) => {
  const btn = app.querySelector(`[data-id='${id}'] .add-to-cart-btn`);
  btn.innerText = "Add to Cart";
  btn.toggleAttribute("disabled");
  btn.classList.remove("bg-indigo-700", "text-white", "border-white");
};

export const addToCartBtnHandler = (event) => {
  const btn = event.target;
  const currentCart = event.target.closest(".product-card");
  const currentId = currentCart.getAttribute("data-id");
  const currentImg = currentCart.querySelector("img");
  // console.log(currentId);
  setCartAddedBtn(currentId);
  const shoppingImg = currentImg.getBoundingClientRect();
  const shoppingCart = cartBtn.querySelector("svg").getBoundingClientRect();
  const cartItemsRect=cartItems.getBoundingClientRect();
  // console.log(shoppingImg);
  let effect;
  if(cartUi.classList.contains("translate-x-full")){
    effect = [
      {
        top: shoppingImg.top + "px",
        left: shoppingImg.left + "px",
        width: shoppingImg.width + "px",
        rotate: 0 + "deg",
      },
      {
        top: shoppingCart.top + "px",
        left: shoppingCart.left + "px",
        width: 0 + "px",
        rotate: 360 + "deg",
      },
    ];

  }else{
    effect = [
      {
        top: shoppingImg.top + "px",
        left: shoppingImg.left + "px",
        width: shoppingImg.width + "px",
        rotate: 0 + "deg",
      },
      {
        top: cartItemsRect.top + 300+"px",
        left: cartItemsRect.left +200+ "px",
        width: 0 + "px",
        rotate: 360 + "deg",
      },
    ];

  }
   

  const Timeline = {
    duration: 500,
    iterations: 1,
  };
  const newImg = new Image(shoppingImg.width, shoppingImg.height);
  newImg.src = currentImg.src;
  newImg.style.position = "fixed";
  newImg.style.zIndex = 51;
  newImg.style.top = shoppingImg.top + "px";
  newImg.style.left = shoppingImg.left + "px";
  // newImg.style.filter="grayscale(100%)"
  app.append(newImg);
  const currentProduct = products.find((el) => el.id == currentId);
  cartItems.append(createCart(currentProduct));

  const newImgAnimation = newImg.animate(effect,Timeline);
  newImgAnimation.addEventListener("finish", () => {
    cartBtn.classList.add("animate__tada");
    cartBtn.addEventListener("animationend", () => {
      cartBtn.classList.remove("animate__tada");
    });
    newImg.remove();
  });
};
