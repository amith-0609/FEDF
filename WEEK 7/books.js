import { booksData } from "./data.js";
import { addToCart, clearCart } from "./cart.js";
import { renderCart } from "./ui.js";

const bookList = document.getElementById("book-list");
const clearBtn = document.getElementById("clear-cart");

function renderBooks() {
  bookList.innerHTML = "";
  booksData.forEach(book => {
    // ✅ Add hyperlink URL based on book ID or title
    let link = "#";
    if (book.id === 1) link = "https://www.oreilly.com/library/view/javascript-the-good/9780596517748/";
    if (book.id === 2) link = "https://eloquentjavascript.net/";
    if (book.id === 3) link = "https://github.com/getify/You-Dont-Know-JS";

    const div = document.createElement("div");
    div.classList.add("book");
    div.innerHTML = `
      <h3>${book.title}</h3>
      <p>Author: ${book.author}</p>
      <p>Price: ₹${book.price}</p>
      <p>Status: ${book.availability}</p>
      <button ${book.availability === "out of stock" ? "disabled" : ""}>Add to Cart</button>
      <p style="margin-top:8px;">
        <a href="${link}" target="_blank" style="color: var(--accent2); text-decoration: underline; font-weight: 500;">
          More Details
        </a>
      </p>
    `;
    div.querySelector("button").addEventListener("click", () => {
      addToCart(book);
      renderCart();
    });
    bookList.appendChild(div);
  });
}

clearBtn.addEventListener("click", () => {
  clearCart();
  renderCart();
});

renderBooks();
renderCart();
