export const homeQuantityToggle = (event, id, stock) => {
  // konsa card click kiys
  const currentCardElement = document.querySelector(`#card${id}`);
  // card ki quantity kitni hae
  const productQuantity = currentCardElement.querySelector(".productQuantity");

  // Access the current card quantity
  let quantity = parseInt(productQuantity.getAttribute("data-quantity")) || 1;

  if (event.target.className === "cartIncrement") {
    if (quantity < stock) {
      quantity++;
    } else if (quantity === stock) {
      quantity = stock;
    }
  }

  if (event.target.className === "cartDecrement") {
    if (quantity > 1) {
      quantity--;
    }
  }

  productQuantity.textContent = quantity;
  productQuantity.setAttribute("data-quantity", quantity);
  return quantity;
};
