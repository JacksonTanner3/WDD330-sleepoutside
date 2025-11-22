import { loadHeaderFooter } from "./utils.mjs";
import ExternalServices from "./ExternalServices.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const listElement = document.querySelector(".product-list");

if (listElement) {
    // Create an instance of our new ExternalServices class
    const dataSource = new ExternalServices();

    const productList = new ProductList("tents", dataSource, listElement);

    // Render the list
    productList.init();
}