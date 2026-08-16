import { homeQuantityToggle } from "./quantityToggle.js";
import { addToCart } from "./addToCart.js";
const productContainer = document.querySelector("#productContainer");
const productTemplate = document.querySelector("#productTemplate");

export const showProductContainer = (products) => {
  if (!products) {
    return;
  }
  products.forEach((curProd) => {
    const { id, name, category, brand, price, stock, image, description } =
      curProd; //  Example : const id = curProd.id;

    /* Template cloning process*/
    const productClone = document.importNode(productTemplate.content, true); // we use 'true' to also import the children of parent node

    /* Give card unique*/
    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`); //example : id = 'card1'

    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productPrice").textContent = `₹${price}`;
    productClone.querySelector(".productActualPrice").textContent =
      `₹${Math.floor(4 * price)}`;
    productClone.querySelector(".productStock").textContent = stock;
    productClone.querySelector(".productStock").textContent = stock;
    productClone.querySelector(".productDescription").textContent = description;
    productClone.querySelector(".productImage").alt = name;

    /* Quantity Toggle*/
    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (e) => {
        homeQuantityToggle(event, id, stock);
      });

    /* Add to cart */
    productClone
      .querySelector(".add-to-cart-button")
      .addEventListener("click", (event) => {
        addToCart(event, id, stock);
      });

    productContainer.append(productClone);
  });
};
