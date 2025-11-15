import { getLocalStorage, setLocalStorage } from './utils.mjs';

// Template for the product details
function productDetailTemplate(product) {
    return `<section class="product-detail">
    <h3>${product.Brand.Name}</h3>
    <h2 class="divider">${product.NameWithoutBrand}</h2>
    
    <img
      class="divider"
      src="${product.Images.PrimaryLarge}"
      alt="${product.Name}"
    />
    
    <p class="product-card__price">$${product.FinalPrice}</p>
    <p class="product__color">${product.Colors[0].ColorName}</p>
    <p class="product__description">
      ${product.DescriptionHtmlSimple}
    </p>
    
    <div class="product-detail__add">
      <button type="button" data-id="${product.Id}" id="addToCart">Add to Cart</button>
    </div>
  </section>`;
}

export default class ProductDetail {
    constructor(productId, dataSource) {
        this.productId = productId;
        this.dataSource = dataSource;
        this.product = {};
    }

    async init() {
        // Fetch the product
        this.product = await this.dataSource.findProductById(this.productId);

        // Render the product
        this.renderProductDetails('.product-detail');
    }

    addProductToCart() {
        console.log("Button clicked!");

        let cart = getLocalStorage('so-cart');

        if (!Array.isArray(cart)) {
            cart = [];
        }

        cart.push(this.product);
        setLocalStorage('so-cart', cart);

        alert("Product added to cart!");
    }

    renderProductDetails(selector) {
        const element = document.querySelector(selector);
        element.innerHTML = productDetailTemplate(this.product);

        document
            .getElementById('addToCart')
            .addEventListener('click', this.addProductToCart.bind(this));
    }
}