import User from "./class/User.js";
import Products from "./class/Products.js";

const logged_user = new User();
const products = new Products();
let MenuItems = document.getElementById("Menu-items");
MenuItems.style.maxHeight = "0px";
function menuToggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "200px";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}

console.log("I AM FROM INDEX.JS ", logged_user);
console.log("Products? ", products);

const productsLink = document.getElementById("products-link");

console.log("I AM INDEX.JS");

productsLink.addEventListener("click", (event) => {
  //   event.preventDefault();
  console.log("I am clicked");
  products.renderProducts();
});
