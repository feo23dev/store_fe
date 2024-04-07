import Products from "./class/Products.js";
const products = new Products();

const filterButtons = document.querySelectorAll(".filter-button");
const product = new Products();

console.log("from products.js", product);

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    const filterWord = event.target.innerText.toLowerCase();

    products.filterProducts(filterWord);
  });
});

console.log("XD", filterButtons);
console.log("P.JS");
window.onload = async () => {
  try {
    const response = await products.fetchProducts();

    products.renderProducts();
  } catch (error) {
    console.log(error);
  }
};
