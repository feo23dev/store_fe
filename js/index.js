import User from "./class/User.js";
import Products from "./products.js";

const logged_user = new User();
const products = new Products();
console.log("I AM FROM INDEX.JS ", logged_user);
console.log("Products? ", products);

window.onload = async () => {
  try {
    const response = await products.fetchProducts();
    console.log(products, "H");
    console.log(response);
  } catch (error) {
    console.log(error);
  }
};
