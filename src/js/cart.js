import { getLocalStorage, setLocalStorage, loadHeaderFooter } from './utils.mjs';

// Template for a single cart item
function cartItemTemplate(item) {
  return `<li class="cart-card divider">
    <a href="/product_detail/index.html?product=${item.Id}" class="cart-card__image">
      
      <img
        src="${item.Images.PrimaryMedium}" 
        alt="${item.Name}"
      />
    </a>
    <a href="/product_detail/index.html?product=${item.Id}">
      <h2 class="card__name">${item.Name}</h2>
    </a>
    <p class="cart-card__color">${item.Colors[0].ColorName}</p>
    <p class="cart-card__quantity">qty: 1</p>
    <p class="cart-card__price">$${item.FinalPrice}</p>
    <span class="cart-card__remove" data-id="${item.Id}">X</span>
  </li>`;
}

// Function to render all cart items
function renderCartItems() {
  const cartItems = getLocalStorage('so-cart') || [];
  const listElement = document.querySelector('.product-list');
  const totalElement = document.querySelector('.cart-total-value');

  if (cartItems.length === 0) {
    listElement.innerHTML = "<p>Your cart is empty.</p>";
    if (totalElement) totalElement.innerText = "$0.00";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  listElement.innerHTML = htmlItems.join('');
  // Calculate the total
  const total = cartItems.reduce((sum, item) => sum + item.FinalPrice, 0);
  if (totalElement) {
    totalElement.innerText = "$" + total.toFixed(2);
  }
  document.querySelectorAll(".cart-card__remove").forEach((item) => {
    item.addEventListener("click", deleteCartItemHandler);
  });
}

function deleteCartItemHandler(e) {
  const id = e.target.dataset.id;
  const cartItems = getLocalStorage("so-cart");

  // Created a new array that includes everything but the item we want to delete
  const newCart = cartItems.filter((item) => item.Id !== id);

  // Save the new list back to local storage
  setLocalStorage("so-cart", newCart);

  // Re-render the list so the item disappears from the screen
  renderCartItems();
}
// Load header/footer
loadHeaderFooter();

// Render the cart
renderCartItems();