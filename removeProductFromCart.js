import { getCartProductFromLS } from "./getCartProducts.js";
import { updateCartValue, updateOrderSummary } from "./updateCartValue.js";
import { showToast } from "./showToast.js";

export const removeProductFromCart = (id) => {
  let cartProducts = getCartProductFromLS();
  cartProducts = cartProducts.filter((currProd) => currProd.id !== id);

  localStorage.setItem("cartProductLS", JSON.stringify(cartProducts));

  let removeDiv = document.getElementById(`card${id}`);

  // grab the product name before the card is removed from the DOM
  const productName = removeDiv
    ? removeDiv.querySelector(".productName").textContent
    : id; // fallback if element isn't found

  if (removeDiv) {
    removeDiv.remove();
  }

  updateCartValue(cartProducts);
  updateOrderSummary(cartProducts);

  /* Toast notification */
  showToast("delete", productName);
};
