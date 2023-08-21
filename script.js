// Product data
const products = [
  { id: 1, name: "Product 1", price: 10 },
  { id: 2, name: "Product 2", price: 20 },
  { id: 3, name: "Product 3", price: 30 },
  { id: 4, name: "Product 4", price: 40 },
  { id: 5, name: "Product 5", price: 50 },
];

// DOM elements
const productList = document.getElementById("product-list");
const cartList = document.getElementById("cart-list");
const clearCartButton = document.getElementById("clear-cart-btn");

// Cart data stored in Session Storage
let cartData = JSON.parse(sessionStorage.getItem("cart") || "[]");

// Render product list
function renderProducts() {
  products.forEach((product) => {
    const li = document.createElement("li");
    li.innerHTML = `${product.name} - $${product.price} <button class="add-to-cart-btn" data-id="${product.id}">Add to Cart</button>`;
    productList.appendChild(li);
  });
}

// Render cart list
function renderCart() {
  cartList.innerHTML = "";
  cartData.forEach((cartItem) => {
    const product = products.find((p) => p.id === cartItem.id);
    if (product) {
      const li = document.createElement("li");
      li.textContent = `${product.name} - $${product.price} `;
      const removeButton = document.createElement("button");
      removeButton.textContent = "Remove";
      removeButton.classList.add("remove-from-cart-btn");
      removeButton.setAttribute("data-id", product.id);
      li.appendChild(removeButton);
      cartList.appendChild(li);
    }
  });
}

// Add item to cart
function addToCart(productId) {
  const product = products.find((p) => p.id === productId);
  if (product) {
    cartData.push({ id: product.id });
    sessionStorage.setItem("cart", JSON.stringify(cartData));
    renderCart();
  }
}

// Remove item from cart
function removeFromCart(productId) {
  cartData = cartData.filter((item) => item.id !== productId);
  sessionStorage.setItem("cart", JSON.stringify(cartData));
  renderCart();
}

// Clear cart
function clearCart() {
  cartData = [];
  sessionStorage.removeItem("cart");
  renderCart();
}

// Event listener for adding to cart
productList.addEventListener("click", (event) => {
  if (event.target.classList.contains("add-to-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    addToCart(productId);
  }
});

// Event listener for removing from cart
cartList.addEventListener("click", (event) => {
  if (event.target.classList.contains("remove-from-cart-btn")) {
    const productId = parseInt(event.target.getAttribute("data-id"));
    removeFromCart(productId);
  }
});

// Event listener for clearing cart
clearCartButton.addEventListener("click", clearCart);

// Initial render
renderProducts();
renderCart();
