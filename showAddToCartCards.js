import products from "./api/product.json";
import { getCartProductFromLS } from "./getCartProducts.js";
import { fetchQuantityFromCartLS } from "./fetchQuantityFromCartLS.js";
import { removeProductFromCart } from "./removeProductFromCart.js";
import { incrementDecrement } from "./incrementDecrement.js";
import { updateOrderSummary } from "./updateCartValue.js";
import { formatPrice } from "./formatPrice.js";

let cartProducts = getCartProductFromLS();

let filterProducts = products.filter((currProd) =>
  cartProducts.some((currElem) => currElem.id === currProd.id)
);

const cartElement = document.querySelector("#productCartContainer");
const templateContainer = document.querySelector("#productCartTemplate");

// To show cart product
const showCartProduct = () => {
  filterProducts.forEach((currProd) => {
    const { category, id, image, name, stock, price } = currProd;
    let productClone = document.importNode(templateContainer.content, true);

    productClone.querySelector("#cardValue").setAttribute("id", `card${id}`); //example : id = 'card1'

    const LSActualData = fetchQuantityFromCartLS(id, price);

    productClone.querySelector(".category").textContent = category;
    productClone.querySelector(".productImage").src = image;
    productClone.querySelector(".productName").textContent = name;
    productClone.querySelector(".productQuantity").textContent =
      LSActualData.quantity;
    productClone
      .querySelector(".productQuantity")
      .setAttribute("data-quantity", LSActualData.quantity);
    productClone.querySelector(".productPrice").textContent =
      `₹${formatPrice(LSActualData.price)}`;

    productClone
      .querySelector(".stockElement")
      .addEventListener("click", (event) => {
        incrementDecrement(event, id, stock, price);
      });

    /* Remove From The Cart */
    productClone
      .querySelector(".remove-to-cart-button")
      .addEventListener("click", () => removeProductFromCart(id));

    cartElement.append(productClone);
  });

  updateOrderSummary(cartProducts);
};

showCartProduct();
