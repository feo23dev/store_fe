import Products from "./class/Products.js";
const products = new Products();

const filterButtons = document.querySelectorAll(".filter-button");
const dropdown = document.getElementById("sort-dropdown");
const inputField = document.querySelector(".mb-5");

const product = new Products();

dropdown.addEventListener("change", () => {
  products.sortProducts();
});

inputField.addEventListener("input", () => {
  products.searchProducts(inputField.value.toLowerCase());
});

filterButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    filterButtons.forEach((button) => button.classList.remove("active"));
    button.classList.add("active");
    const filterWord = event.target.innerText.toLowerCase();

    products.filterProducts(filterWord);
  });
});

window.onload = async () => {
  try {
    const response = await products.fetchProducts();

    products.renderProducts();
  } catch (error) {
    console.log(error);
  }
};
