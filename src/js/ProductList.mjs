// A simple template
function productCardTemplate(product) {
    return `<li class="product-card">
    <a href="/product_detail/index.html?product=${product.Id}">
      <img
        src="${product.Images.PrimaryMedium}"
        alt="Image of ${product.Name}"
      />
      <h3 class="card__brand">${product.Brand.Name}</h3>
      <h2 class="card__name">${product.NameWithoutBrand}</h2>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
    constructor(category, dataSource, listElement) {
        this.category = category;
        this.dataSource = dataSource;
        this.listElement = listElement;
        this.template = productCardTemplate;
    }

    async init() {
        // Get the product data
        const list = await this.dataSource.getData(this.category);

        // Render the list
        if (list && list.length > 0) {
            this.renderList(list);
        } else {
            this.listElement.innerHTML = `<p>No products found for ${this.category}.</p>`;
        }

        // Set the title
        const titleElement = document.querySelector('.product-list-container h2');
        if (titleElement) {
            titleElement.innerText += `: ${this.category}`;
        }
    }

    renderList(list) {
        // Clear the list element
        this.listElement.innerHTML = "";

        // Create the new list
        const newList = list.map(this.template);

        // Inject it into the page
        this.listElement.innerHTML = newList.join("");
    }
}