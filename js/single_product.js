import Products from "./class/Products.js";
const products = new Products();
document.addEventListener("DOMContentLoaded", function () {
  // Function to retrieve URL parameters
  function getUrlParams() {
    const params = new URLSearchParams(window.location.search);

    return params.get("product");
  }

  // Function to decode and parse the product data
  function getProductData() {
    const encodedProductData = getUrlParams();
    if (encodedProductData) {
      return JSON.parse(decodeURIComponent(encodedProductData));
    }
    return null;
  }
  const singleProductData = getProductData();
  console.log("Single Product Data", singleProductData);

  products.renderProductDetails(singleProductData);
  console.log("URL is", singleProductData.image);

  // Function to render the product details
});
