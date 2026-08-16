import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue } from "./updateCartValue.js";

getCartProductFromLS();

export const addToCart = (event, id, stock) => {
  // This will store the data from the local storage
  let arrLocalStorageProduct = getCartProductFromLS();

  const currentProductElement = document.querySelector(`#card${id}`);
  let quantity = Number(
    currentProductElement.querySelector(`.productQuantity`).innerText
  );
  let price = currentProductElement.querySelector(".productPrice").innerText;

  // remove the ₹ symbol
  price = Number(price.replace("₹", ""));

  // check if the product already exists in the cart
  const existingProd = arrLocalStorageProduct.find(
    (currProd) => currProd.id === id
  );

  if (existingProd) {
    // merge the new quantity into the existing entry
    const newQuantity = Number(existingProd.quantity) + quantity;
    const newPrice = price * newQuantity;

    const updatedCartProducts = arrLocalStorageProduct.map((currProd) =>
      currProd.id === id
        ? { id, quantity: newQuantity, price: newPrice }
        : currProd
    );

    localStorage.setItem("cartProductLS", JSON.stringify(updatedCartProducts));

    /* Update the cart button */
    updateCartValue(updatedCartProducts);
    return;
  }

  // new product, not yet in the cart
  const totalPrice = price * quantity;

  arrLocalStorageProduct.push({ id, quantity, price: totalPrice });
  localStorage.setItem("cartProductLS", JSON.stringify(arrLocalStorageProduct));

  /* Update the cart button */
  updateCartValue(arrLocalStorageProduct);
};