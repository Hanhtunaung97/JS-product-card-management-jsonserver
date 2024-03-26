import { cartObserver } from "./app/cart";
import { categoryRender } from "./app/category";
import { productRender } from "./app/product";
import { url } from "./core/functions";
import { cartBtnHandler, categoryListsHandler, orderNowBtnHandler, searchBtnHandler, searchInputHandler } from "./core/handlers";
import { cartBtn, categoryLists, closeBtn, orderNowBtn, searchBtn, searchInput } from "./core/selectors";
import { categories, products } from "./core/variables";

export default class Shop{
    // preRender(){
    //     // categoryRender(categories);
    //     // productRender(products);
    //     fetch(url('/categories')).then(res=>res.json()).then(json=>categoryRender(json));
    //     fetch(url('/products')).then(res=>res.json()).then(json=>productRender(json))

    // }
    async preRender(){
        const res=await fetch(url('/categories'));
        const json=await res.json();
        categoryRender(json);
        const proRes=await fetch(url('/products'));
        const proJson=await proRes.json();
        productRender(proJson);
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