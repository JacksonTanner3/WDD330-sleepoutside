import ProductData from './ProductData.mjs';
import ProductDetail from './ProductDetail.mjs';
import { loadHeaderFooter, getParam } from './utils.mjs';

async function setupPage() {
    // Load the header and footer
    await loadHeaderFooter();

    // Get the product ID from the URL
    const productId = getParam('product');

    // create an instance of the ProductData class.
    const dataSource = new ProductData();

    // create an instance of the ProductDetail class
    const product = new ProductDetail(productId, dataSource);

    // finally call the init method to show the product
    product.init();
}

setupPage(); // Run our setup function