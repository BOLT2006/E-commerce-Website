import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue, updateOrderSummary } from "./updateCartValue.js";
import { formatPrice } from "./formatPrice.js";

export const incrementDecrement = (event, id, stock, price) => {
  // only react to the +/- buttons, ignore other clicks in .stockElement
  if (
    event.target.className !== "cartIncrement" &&
    event.target.className !== "cartDecrement"
  ) {
    return;
  }

  const currentCardElement = document.querySelector(`#card${id}`);
  const productQuantityElem = currentCardElement.querySelector(".productQuantity");
  const productPriceElem = currentCardElement.querySelector(".productPrice");

  let cartProducts = getCartProductFromLS();
  const existingProd = cartProducts.find((currProd) => currProd.id === id);

  let quantity = existingProd ? Number(existingProd.quantity) : 1;

  if (event.target.className === "cartIncrement" && quantity < stock) {
    quantity++;
  }

  if (event.target.className === "cartDecrement" && quantity > 1) {
    quantity--;
  }

  const totalPrice = formatPrice(price * quantity);

  // update this product's entry in localStorage
  cartProducts = cartProducts.map((currProd) =>
    currProd.id === id
      ? { ...currProd, quantity, price: totalPrice }
      : currProd
  );
  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  // reflect the change in the DOM for this card
  productQuantityElem.textContent = quantity;
  productQuantityElem.setAttribute("data-quantity", quantity);
  productPriceElem.textContent = `₹${totalPrice}`;

  // update cart icon count + subtotal/final total
  updateCartValue(cartProducts);
  updateOrderSummary(cartProducts);
};
