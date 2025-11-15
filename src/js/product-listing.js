import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";
import { loadHeaderFooter, getParam } from "./utils.mjs";

async function setupPage() {
    // Load the header and footer
    await loadHeaderFooter("../");

    // Get the category
    const category = getParam('category');

    // if no category, default to "tents"
    const finalCategory = category || "tents";

    // create an instance of the ProductData class.
    const dataSource = new ProductData();

    const listElement = document.querySelector('.product-list');

    const myList = new ProductList(finalCategory, dataSource, listElement);

    // call the init
    myList.init();
}

setupPage();