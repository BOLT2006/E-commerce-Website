export function showToast(operation, name) {
  const toast = document.createElement("div");
  toast.classList.add("toast");

  // Set the text content of the toast based on the operation
  if (operation === "add") {
    toast.textContent = `${name} has been added to the cart.`;
  } else {
    toast.textContent = `${name} has been removed from the cart.`;
  }

  document.body.appendChild(toast);

  // Automatically remove the toast after a few seconds
  setTimeout(() => {
    toast.remove();
  }, 2000);
}
