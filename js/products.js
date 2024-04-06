import Products from "./class/Products.js";
const products = new Products();
console.log("P.JS");
window.onload = async () => {
  try {
    const response = await products.fetchProducts();
    products.renderProducts();
  } catch (error) {
    console.log(error);
  }
};
