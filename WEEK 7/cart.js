let cart = [];

export function addToCart(book) {
  const existing = cart.find(item => item.id === book.id);
  if (existing) {
    existing.quantity++;
  } else {
    cart.push({ ...book, quantity: 1 });
  }
}

export function removeFromCart(id) {
  cart = cart.filter(item => item.id !== id);
}

export function decreaseQuantity(id) {
  const item = cart.find(i => i.id === id);
  if (item) {
    item.quantity--;
    if (item.quantity <= 0) removeFromCart(id);
  }
}

export function clearCart() {
  cart = [];
}

export function getCart() {
  return cart;
}

export function getTotal() {
  return cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
}
