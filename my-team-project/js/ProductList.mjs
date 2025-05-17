import { renderListWithTemplate } from './utils.mjs';

function productCardTemplate(product) {
  return `<li class="product-card">
    <a href="product_pages/index.html?product=${product.Id}">
      <img 
        src="${product.Image}" 
        alt="${product.Name}" 
        loading="lazy"
        width="300" 
        height="300"
      >
      <h2 class="card__brand">${product.Brand.Name}</h2>
      <h3 class="card__name">${product.Name}</h3>
      <p class="product-card__price">$${product.FinalPrice}</p>
    </a>
  </li>`;
}

export default class ProductList {
  constructor(category, dataSource, listElement) {
    this.category = category;
    this.dataSource = dataSource;
    this.listElement = listElement;
  }

  async init() {
    try {
      const list = await this.dataSource.getData();
      this.filterList(list);
      this.renderList(list);
    } catch (error) {
      console.error('Error loading products:', error);
    }
  }

  filterList(list) {
    return list.filter(item => item.Category.Name === this.category);
  }

  renderList(list) {
    this.listElement.innerHTML = '';
    renderListWithTemplate(
      productCardTemplate,
      this.listElement,
      this.filterList(list)
    );
  }
}