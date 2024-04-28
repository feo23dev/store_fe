import ShoppingCart from "./class/ShoppingCart.js";
import Checkout from "./class/Checkout.js";

const checkOut = new Checkout();

console.log("CHECKOUT", checkOut);
if (checkOut.cart.items.length === 0) {
  alert("You have no items in your cart");
  window.location.href = "products.html";
}
checkOut.createProduct();
