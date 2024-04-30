import ShoppingCart from "./class/ShoppingCart.js";
import Checkout from "./class/Checkout.js";

const checkOut = new Checkout();
const shoppingCart = new ShoppingCart();

console.log("CHECKOUT", checkOut);
if (checkOut.cart.items.length === 0) {
  alert("You have no items in your cart");
  window.location.href = "products.html";
}
checkOut.createProduct();

document.addEventListener("DOMContentLoaded", function () {
  const form = document.querySelector(".form");

  form.addEventListener("submit", function (event) {
    event.preventDefault(); // Prevent the default form submission behavior

    // Collect input values
    const email = document.getElementById("e-mail").value;
    const phoneNumber = document.getElementById("phone-num").value;
    const fullName = document.getElementById("f-name").value;
    const address = document.getElementById("address").value;
    const city = document.getElementById("city").value;
    const country = document.getElementById("country").value;
    const postalCode = document.getElementById("zip-code").value;
    const saveInfo = document.getElementById("save-info").checked;
    // Create an object with collected data
    const formData = {
      email: email,
      phoneNumber: phoneNumber,
      fullName: fullName,
      address: address,
      city: city,
      country: country,
      postalCode: postalCode,
      saveInfo: saveInfo,
      total: checkOut.cart.total,
    };
    console.log("checkoutJS shopping cart", shoppingCart);

    // Send data to backend (You can use fetch API or any other method to send data to backend)
    checkOut.sendOrder(formData, shoppingCart);
  });
});
