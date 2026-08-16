const cartValue = document.querySelector("#cartValue");

// Sum the quantity of every product in the cart, not just the number of distinct products
export const updateCartValue = (cartProducts) => {
  const totalQuantity = cartProducts.reduce(
    (total, product) => total + Number(product.quantity),
    0
  );

  return (cartValue.innerHTML = `<i class="fa-solid fa-cart-shopping ">${totalQuantity}</i>`);
}; 