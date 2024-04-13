import Products from "./class/Products.js";
import User from "./class/User.js";
const user = new User();
const products = new Products();

const navigationLinks = document.querySelectorAll(".navigation a");
const contentArea = document.querySelector(".content-area");

const userToken = user.getToken;

// Function to load content from separate HTML files
function loadContent(contentId) {
  const url = `${contentId}.html`;
  console.log("URL IS", url);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      contentArea.innerHTML = data;
      initializeAddProductLogic();
    })
    .catch((error) => {
      console.error("Error fetching content:", error);
      contentArea.innerHTML = "Error loading content";
    });
}

navigationLinks.forEach((link) => {
  link.addEventListener("click", function (event) {
    event.preventDefault();

    const contentId = this.dataset.content;
    loadContent(contentId);
  });
});

function initializeAddProductLogic() {
  const addProduct_button = document.getElementById("addProduct-button");

  addProduct_button.addEventListener("click", async (event) => {
    event.preventDefault();
    const product_name = document.getElementById("productName").value;
    const product_price = document.getElementById("productPrice").value;
    const product_image = document.getElementById("productImage").value;
    const product_description =
      document.getElementById("productDescription").value;
    const company_name = document.getElementById("companyName").value;
    const category_name = document.getElementById("categoryName").value;
    const product_stock = document.getElementById("productStock").value;
    const data = {
      name: product_name,
      price: product_price,
      image: product_image,
      description: product_description,
      company_id: company_name,
      category_id: category_name,
      stok: product_stock,
    };

    try {
      const response = await products.createProduct(data, userToken);
      const json = await response.json();
      console.log("RESPONSE FROM ADDING PRODUCT", json);
    } catch (error) {
      console.log("ERROR ADDING PRODUCT", error);
    }
  });
}
