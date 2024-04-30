import Products from "./class/Products.js";
import User from "./class/User.js";
const products = new Products();

const filterButtons = document.querySelectorAll(".filter-button");
const dropdown = document.getElementById("sort-dropdown");
const inputField = document.querySelector(".mb-5");
const logged_user = new User();

const login = document.getElementById("login");

if (logged_user.email) {
  login.innerHTML = "Logout";
  login.addEventListener("click", () => {
    if (logged_user.email) {
      localStorage.removeItem("User");
      alert("You have been logged out");
      window.location.href = "index.html";
    }
  });
}

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
