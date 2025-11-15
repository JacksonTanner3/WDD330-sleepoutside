import { getLocalStorage, loadHeaderFooter } from './utils.mjs';

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
  </li>`;
}

// Function to render all cart items
function renderCartItems() {
  const cartItems = getLocalStorage('so-cart') || [];
  const listElement = document.querySelector('.product-list');

  if (cartItems.length === 0) {
    listElement.innerHTML = "<p>Your cart is empty.</p>";
    return;
  }

  const htmlItems = cartItems.map(cartItemTemplate);
  listElement.innerHTML = htmlItems.join('');
}

// Load header/footer
loadHeaderFooter('../');

// Render the cart
renderCartItems();