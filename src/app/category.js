import { categoryLists } from "../core/selectors";

export const categoryRender = (list) => {
  list.forEach((el) => categoryLists.append(createCategoryUi(el)));
};

export const createCategoryUi = (categoryName) => {
  const btn = document.createElement("button");
  btn.innerText = categoryName;
  btn.classList.add("category-badge");
  return btn;
};
