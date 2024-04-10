import User from "./class/User.js";
import Products from "./class/Products.js";

const logged_user = new User();
const products = new Products();

let hamburgerIcon = document.querySelector(".menu-icon");
hamburgerIcon.addEventListener("click", menuToggle);
let MenuItems = document.getElementById("Menu-items");
MenuItems.style.maxHeight = "0px";

function menuToggle() {
  if (MenuItems.style.maxHeight == "0px") {
    MenuItems.style.maxHeight = "200px";
  } else {
    MenuItems.style.maxHeight = "0px";
  }
}
