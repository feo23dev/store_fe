console.log("Register page");
import User from "./class/User.js";
const registerButton = document.getElementById("register-button");
const userEmail = document.getElementById("email");
const userPassword = document.getElementById("password");
const firstName = document.getElementById("firstName");
const lastName = document.getElementById("lastName");
const user = new User();

registerButton.addEventListener("click", async (event) => {
  event.preventDefault();
  const email = userEmail.value;
  const password = userPassword.value;
  const first_name = firstName.value;
  const last_name = lastName.value;

  const formData = { email, password, first_name, last_name };
  try {
    const answer = await user.signUp(formData);
    console.log("ANSWER", answer);

    if (answer.status === "fail") {
      alert(answer.message);
      window.location.replace("login.html");
    } else {
      console.log(answer.data.email);
      alert(`Succesfuly registered with ${answer.data.email}!`);
      //   window.location.replace("index.html");
    }
  } catch (error) {
    console.log(error);
  }
});
