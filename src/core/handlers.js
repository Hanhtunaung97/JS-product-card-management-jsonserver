import Swal from "sweetalert2";
import { productRender, removeCartAddedBtn } from "../app/product";
import {
  app,
  cartTotalAmount,
  cartUi,
  categoryLists,
  searchInput,
} from "./selectors";
import { products } from "./variables";

export const searchBtnHandler = () => {
  searchInput.classList.add("animate__bounceInDown", "animate__fast");
  searchInput.addEventListener("animationend",() => {
    searchInput.classList.remove("animate__bounceInDown", "animate__fast");
  })
  searchInput.focus(); 
};
export const searchInputHandler = (event) => {
  productRender(
    products.filter(product => product.title.toLowerCase().search(event.target.value.toLowerCase()) >= 0)
  );
};
export const cartBtnHandler = () => {
  cartUi.classList.toggle("translate-x-full");
  cartUi.classList.add("duration-300");
};
export const categoryListsHandler = (event) => {
  if (event.target.classList.contains("category-badge")) {
    const currentCategoryBtn = event.target;
    const currentCategory = currentCategoryBtn.innerText.toLowerCase();
    const lastActiveCategoryBtn = categoryLists.querySelector(
      ".category-badge.active"
    );
    lastActiveCategoryBtn.classList.toggle("active");
    currentCategoryBtn.classList.add("active");
    console.log(currentCategory);
    productRender(
      products.filter(
        (product) =>
          product.category === currentCategory || currentCategory === "all"
      )
    );
  }
};

export const orderNowBtnHandler = (event) => {
  // customer_id,product_id,quantity,total,time
  Swal.fire({
    title: "Order Confirm?",
    text: "You won't be able to revert this!",
    icon: "question",
    showCancelButton: true,
    // confirmButtonColor: "#3085d6",
    // cancelButtonColor: "#d33",
    confirmButtonText: "Yes, order it!",
  }).then((result) => {
    if (result.isConfirmed) {
      const customerId = Math.floor(Math.random() * 10000);
      const time = Date.now();
      const total = parseFloat(cartTotalAmount.innerText);
      const orderItem = [];
      const allCarts = app.querySelectorAll(".cart-item");
      allCarts.forEach((cart) => {
        const productId = parseFloat(cart.getAttribute("product-id"));
        const quantity = parseFloat(app.querySelector(".cart-q").innerText);
        orderItem.push({
          product_id: productId,
          quantity: quantity,
        });
        removeCartAddedBtn(productId);

        cart.remove();
      });

      Swal.fire({
        title: "Ordered!",
        text: "Your products have been ordered.",
        icon: "success",
      });
      const order = { customerId, time, total, orderItem };
      console.log(order);
    }
  });
};
