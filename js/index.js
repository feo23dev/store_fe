import User from "./class/User.js";

const logged_user = new User();
const adminLink = document.getElementById("adminLink");
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
if (logged_user.getRole === 2) {
  adminLink.style.display = "block";
}

console.log("CURRENTLY LOGGED USER IS", logged_user.email);
adminLink.addEventListener("click", async (event) => {
  console.log("Link clicked");
  event.preventDefault();
  try {
    const response = await fetch("http://localhost:5000/api/v1/users/admin", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${logged_user.getToken}`,
      },
    });
    const json = await response.json();
    if (json.status === "success") {
      window.location.href = "admin.html";
    }
  } catch (error) {
    console.log(error.message);
  }
});

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
