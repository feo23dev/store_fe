import Products from "./class/Products.js";
import ShoppingCart from "./class/ShoppingCart.js";
const shoppingCart = new ShoppingCart();

const products = new Products();
const cartItems = shoppingCart.items;
console.log("Cart Items", cartItems);
document.addEventListener("DOMContentLoaded", function () {
  // Function to retrieve URL parameters
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    return params.get("product");
  }

  // Function to decode and parse the product data
  function getProductData() {
    const encodedProductData = getUrlParams();
    if (encodedProductData) {
      return JSON.parse(decodeURIComponent(encodedProductData));
    }
    return null;
  }
  const singleProductData = getProductData();

  products.renderProductDetails(singleProductData);

  // Function to render the product details
});

let iconCart = document.querySelector(".icon-cart");
let body = document.querySelector("body");

let checkOut = document.querySelector(".checkOut");
iconCart.addEventListener("click", function () {
  body.classList.toggle("showCart");
  shoppingCart.renderData();
});

checkOut.addEventListener("click", function () {
  window.location.href = "checkout.html";
});

console.log("ICONNNNNNNNNNNNNN", iconCart);
