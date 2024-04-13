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

  console.log("Form Data", data);
});
