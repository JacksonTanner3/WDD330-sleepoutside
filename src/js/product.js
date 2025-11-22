import { setLocalStorage } from './utils.mjs';
import ExternalServices from './ExternalServices.mjs'; // CHANGED: Import ExternalServices
import { loadHeaderFooter } from "./utils.mjs";

loadHeaderFooter("../");

// CHANGED: Use ExternalServices
const dataSource = new ExternalServices('tents');

function addProductToCart(product) {
  setLocalStorage('so-cart', product);
}

// add to cart button event handler
async function addToCartHandler(e) {
  const product = await dataSource.findProductById(e.target.dataset.id);
  addProductToCart(product);
}

// add listener to Add to Cart button
document
  .getElementById('addToCart')
  .addEventListener('click', addToCartHandler);