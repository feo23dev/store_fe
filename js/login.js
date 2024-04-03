import User from "./class/User.js";
const loginButton = document.getElementById("login-button");

const loginEmail = document.getElementById("login-email");
const loginPassword = document.getElementById("login-password");
const logged_user = new User();
console.log("User obj", logged_user);

loginButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = loginEmail.value;
  const password = loginPassword.value;
  console.log("Email: ", email);
  console.log("Password: ", password);

  try {
    const response = await logged_user.login(email, password);
    console.log("RESPONSE IN LOGIN JS", response);

    console.log("LOGGED_USER", logged_user);

    alert(`Welcome ${logged_user.first_name || logged_user.email}`);
  } catch (error) {
    alert(error);
  }
});
