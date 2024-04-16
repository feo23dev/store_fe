import Products from "./class/Products.js";
import User from "./class/User.js";
const user = new User();
const products = new Products();

const navigationLinks = document.querySelectorAll(".navigation a");
const contentArea = document.querySelector(".content-area");

const userToken = user.getToken;
if (user.getRole !== 2) {
  // redict the user to home page
  window.location.href = "/";
}

// Function to load content from separate HTML files
function loadContent(contentId) {
  const url = `${contentId}.html`;
  console.log("URL IS", url);
  fetch(url)
    .then((response) => response.text())
    .then((data) => {
      contentArea.innerHTML = data;
      if (url === "addproduct.html") {
        initializeAddProductLogic();
      }
      if (url === "adminusers.html") {
        initializeUsersLogic();
      }
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
  const form = document.getElementById("addproduct-form");

  console.log("FORM", form);

  form.addEventListener("submit", async (event) => {
    const formData = new FormData();
    event.preventDefault();

    const product_name = document.getElementById("productName").value;
    const product_price = document.getElementById("productPrice").value;
    const product_image = document.getElementById("productImage").files[0];
    const product_description =
      document.getElementById("productDescription").value;
    const company_name = document.getElementById("companyName").value;
    const category_name = document.getElementById("categoryName").value;
    const product_stock = document.getElementById("productStock").value;

    formData.append("name", product_name);
    formData.append("image", product_image);
    formData.append("price", product_price);
    formData.append("description", product_description);
    formData.append("company_id", company_name);
    formData.append("category_id", category_name);
    formData.append("stok", product_stock);

    for (var key of formData.entries()) {
      console.log(key[0] + ", " + key[1]);
    }

    try {
      console.log("THIS IS FORM DATA", formData);
      const response = await products.createProduct(formData, userToken);

      console.log("RESPONSE FROM ADDING PRODUCT", response);
    } catch (error) {
      console.log("ERROR ADDING PRODUCT", error);
    }
  });
}

async function initializeUsersLogic() {
  console.log("init users logic run");
  try {
    const response = await user.getAllUsers();
    const userList = response.data.users;

    const tableBody = document.getElementById("user-table-body");

    // Loop through each user and create a row in the table
    userList.forEach((user) => {
      const row = document.createElement("tr");

      // Populate row cells with user data
      row.innerHTML = `
              <td>${user.id}</td>
              <td>${user.first_name}</td>
              <td>${user.last_name}</td>
              <td>${user.email}</td>
              <td>${user.role_id}</td>
              <td><button data-id="${user.id}" class="delete-btn">Delete</button></td>
            `;

      // Append row to the table body
      tableBody.appendChild(row);
    });
  } catch (error) {
    console.log("ERROR GETTING USERS", error);
  }
}
