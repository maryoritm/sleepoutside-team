export function updateCartCount() {
    const cart = JSON.parse(localStorage.getItem("cart")) || [];
    const cartCount = cart.reduce((total, item) => total + (item.quantity || 1), 0);
    const cartIcon = document.querySelector(".cart svg");

    if (cartCount > 0) {
        let counter = document.querySelector(".cart-counter");
        if (!counter) {
            counter = document.createElement("span");
            counter.className = "cart-counter";
            cartIcon.parentNode.appendChild(counter);
        }
        counter.textContent = cartCount;
    } else {
        const counter = document.querySelector(".cart-counter");
        if (counter) counter.remove();
    }
  }