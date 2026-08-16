import { formatPrice } from "./formatPrice.js";

const cartValue = document.querySelector("#cartValue");

// Sum the quantity of every product in the cart, not just the number of distinct products
export const updateCartValue = (cartProducts) => {
  const totalQuantity = cartProducts.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping"></i> ${totalQuantity}`);
};

// Updates the Sub Total / Final Total shown on the cart page
export const updateOrderSummary = (cartProducts) => {
  const subTotalElem = document.querySelector(".productSubTotal");
  const finalTotalElem = document.querySelector(".productFinalTotal");

  if (!subTotalElem || !finalTotalElem) return; // not on the cart page

  const subTotal = formatPrice(
    cartProducts.reduce((total, product) => total + Number(product.price), 0)
  );

  const tax = cartProducts.length ? 50 : 0;
  const finalTotal = formatPrice(subTotal + tax);

  subTotalElem.textContent = `₹${subTotal}`;
  finalTotalElem.textContent = `₹${finalTotal}`;
};
