import { cartObserver } from "./app/cart";
import { categoryRender } from "./app/category";
import { productRender } from "./app/product";
import { cartBtnHandler, categoryListsHandler, orderNowBtnHandler, searchBtnHandler, searchInputHandler } from "./core/handlers";
import { cartBtn, categoryLists, closeBtn, orderNowBtn, searchBtn, searchInput } from "./core/selectors";
import { categories, products } from "./core/variables";

export default class Shop{
    preRender(){
        categoryRender(categories);
        productRender(products);

    }
    listener(){
        cartBtn.addEventListener("click",cartBtnHandler);
        closeBtn.addEventListener("click",cartBtnHandler)
        categoryLists.addEventListener("click",categoryListsHandler)
        orderNowBtn.addEventListener("click",orderNowBtnHandler)
        searchBtn.addEventListener("click",searchBtnHandler)
        searchInput.addEventListener("keyup",searchInputHandler)

    }
    observer(){
        cartObserver();
    }
    init(){
        console.log("shop app start");
        this.observer();
        this.preRender();
        this.listener();

    }
}