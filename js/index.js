import User from "./class/User.js";
import Products from "./class/Products.js";

const logged_user = new User();
const products = new Products();
console.log("I AM FROM INDEX.JS ", logged_user);
console.log("Products? ", products);

const productsLink = document.getElementById("products-link");

console.log("I AM INDEX.JS");

productsLink.addEventListener("click", (event) => {
  //   event.preventDefault();
  console.log("I am clicked");
  products.renderProducts();
});

window.onload = async () => {
  try {
    const response = await products.fetchProducts();
    console.log(products, "H");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
