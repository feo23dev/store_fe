import Products from "./class/Products.js";
import User from "./class/User.js";
const user = new User();
const products = new Products();

const navigationLinks = document.querySelectorAll(".navigation a");
const contentArea = document.querySelector(".content-area");

let pageNumber = 0;
let numberOfItemsPerPage = 5;
let usersList = [];

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
  try {
    const response = await user.getAllUsers();
    usersList = response.data.users;

    createPagination(usersList);

    // function renderUserList() {
    //   for (let i = pageNumber - 1; i < numberOfItemsPerPage; i++) {
    //     const row = document.createElement("tr");

    //     // Populate row cells with user data
    //     row.innerHTML = `
    //             <td>${usersList[i].id}</td>
    //             <td>${usersList[i].first_name}</td>
    //             <td>${usersList[i].last_name}</td>
    //             <td>${usersList[i].email}</td>
    //             <td>${usersList[i].role_id}</td>
    //             <td><button data-id="${usersList[i].id}" class="delete-btn">Delete</button></td>
    //           `;

    //     // Append row to the table body
    //     tableBody.appendChild(row);
    //   }
    // }
    renderUserList();
  } catch (error) {
    console.log("ERROR GETTING USERS", error);
  }
}

function renderUserList() {
  const tableBody = document.getElementById("user-table-body");
  tableBody.innerHTML = "";
  for (
    let i = pageNumber * numberOfItemsPerPage;
    i < pageNumber * numberOfItemsPerPage + 5;
    i++
  ) {
    if (i < usersList.length) {
      const row = document.createElement("tr");

      // Populate row cells with user data
      row.innerHTML = `
            <td>${usersList[i].id}</td>
            <td>${usersList[i].first_name}</td>
            <td>${usersList[i].last_name}</td>
            <td>${usersList[i].email}</td>
            <td>${usersList[i].role_id}</td>
            <td><button data-id="${usersList[i].id}" class="delete-btn">Delete</button></td>
          `;

      // Append row to the table body
      tableBody.appendChild(row);
      const deleteButton = row.querySelector(".delete-btn");
      deleteButton.addEventListener("click", async function () {
        const userId = this.getAttribute("data-id");
        // Call your delete function or do something with userId
        try {
          const response = await user.deleteUserById(userId);
          const json = await response.json();
          console.log("JSON FROM DELETE", json);
          alert(json.message);
        } catch (error) {
          console.log(error, "ERROR DELETING USER");
          alert(json.message);
        }
      });
    }
  }
}

function createPagination(data) {
  const pagination = document.getElementById("pagination");
  pagination.classList.add("pagination");

  let totalPages = Math.ceil(data.length / numberOfItemsPerPage);
  console.log("We will have this many pages", totalPages);

  const previousButton = document.createElement("button");
  previousButton.classList.add("admin-prev-next-button");
  previousButton.innerHTML = "Previous";
  pagination.appendChild(previousButton);
  previousButton.addEventListener("click", () => {
    if (pageNumber > 0) {
      pageNumber--;
    }

    renderUserList();
  });

  for (let i = 0; i < totalPages; i++) {
    const pageButton = document.createElement("button");
    pageButton.innerHTML = i + 1;
    pageButton.classList.add("page-number");
    pageButton.dataset.page = i + 1;
    pagination.appendChild(pageButton);
    pageButton.addEventListener("click", () => {
      pageNumber = i;
      renderUserList();
    });
  }

  const nextButton = document.createElement("button");
  nextButton.classList.add("admin-prev-next-button");
  nextButton.innerHTML = "Next";
  pagination.appendChild(nextButton);
  nextButton.addEventListener("click", () => {
    console.log("PAGE NUMBER IS, INCREATES", pageNumber);
    if (pageNumber < totalPages - 1) {
      pageNumber++;
    }

    console.log("The page number is ,", pageNumber);
    renderUserList();
  });
}
