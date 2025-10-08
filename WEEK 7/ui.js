import { getCart, getTotal, removeFromCart, decreaseQuantity } from "./cart.js";

export function renderCart() {
  const cartContainer = document.getElementById("cart-items");
  const totalContainer = document.getElementById("total");
  const cart = getCart();

  cartContainer.innerHTML = "";
  if (cart.length === 0) {
    cartContainer.innerHTML = "<p>Your cart is empty.</p>";
  } else {
    cart.forEach(item => {
      const div = document.createElement("div");
      div.classList.add("cart-item");
      div.innerHTML = `
        <div>
          <h4>${item.title}</h4>
          <p>₹${item.price} × ${item.quantity}</p>
        </div>
        <div>
          <button data-action="decrease" data-id="${item.id}">-</button>
          <button data-action="remove" data-id="${item.id}">Remove</button>
        </div>
      `;
      cartContainer.appendChild(div);
    });
  }

  totalContainer.textContent = getTotal();

  cartContainer.querySelectorAll("button").forEach(btn => {
    const id = parseInt(btn.getAttribute("data-id"));
    const action = btn.getAttribute("data-action");
    btn.addEventListener("click", () => {
      if (action === "remove") removeFromCart(id);
      if (action === "decrease") decreaseQuantity(id);
      renderCart();
    });
  });
}
