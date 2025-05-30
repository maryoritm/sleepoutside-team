import { loadHeaderFooter } from "./utils.mjs";
import ProductData from "./ProductData.mjs";
import ProductList from "./ProductList.mjs";

loadHeaderFooter();

const dataSource = new ProductData("tents");
const element = document.querySelector(".product-list");
const productList = new ProductList("Tents", dataSource, element);

// Cargar productos iniciales
productList.init().then(() => {
    // Configurar event listeners para los filtros después de que los productos se carguen
    setupFilters();
});

function setupFilters() {
    const categoryFilter = document.getElementById("category-filter");
    const priceFilter = document.getElementById("price-filter");
    const resetFiltersBtn = document.getElementById("reset-filters");

    categoryFilter.addEventListener("change", applyFilters);
    priceFilter.addEventListener("change", applyFilters);
    resetFiltersBtn.addEventListener("click", resetFilters);
}

function applyFilters() {
    const categoryValue = document.getElementById("category-filter").value;
    const priceValue = document.getElementById("price-filter").value;

    // Obtener todos los productos
    const allProducts = productList.products;

    // Filtrar productos
    let filteredProducts = [...allProducts];

    // Aplicar filtro de categoría
    if (categoryValue !== "all") {
        filteredProducts = filteredProducts.filter(
            product => product.Category.toLowerCase().replace(' ', '-') === categoryValue.toLowerCase()
        );
    }

    // Aplicar filtro de precio
    if (priceValue !== "all") {
        filteredProducts = filteredProducts.filter(product => {
            const price = product.FinalPrice;
            switch (priceValue) {
                case "0-50": return price >= 0 && price <= 50;
                case "50-100": return price > 50 && price <= 100;
                case "100-200": return price > 100 && price <= 200;
                case "200+": return price > 200;
                default: return true;
            }
        });
    }

    // Mostrar productos filtrados
    renderFilteredProducts(filteredProducts);
}

function renderFilteredProducts(products) {
    element.innerHTML = "";

    if (products.length === 0) {
        element.innerHTML = "<li class='no-products'>No products match your filters.</li>";
        return;
    }

    products.forEach(product => {
        const productCard = document.createElement("li");
        productCard.className = "product-card";
        productCard.innerHTML = `
            <a href="product_pages/?product=${product.Id}">
                <img src="${product.Image}" alt="${product.Name}" />
                <h3 class="card__brand">${product.Brand.Name}</h3>
                <h2 class="card__name">${product.Name}</h2>
                <p class="product-card__price">$${product.FinalPrice.toFixed(2)}</p>
            </a>
        `;
        element.appendChild(productCard);
    });
}

function resetFilters() {
    document.getElementById("category-filter").value = "all";
    document.getElementById("price-filter").value = "all";
    applyFilters();
}