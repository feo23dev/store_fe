// import dataArray from "./data.js";
// console.log("Here");
// console.log(dataArray);

class Products {
  #backend_url = "http://localhost:5000/api/v1/products";
  #products = [];
  #state;

  constructor() {
    this.#state = [];
  }

  getProducts() {
    return this.#products;
  }

  setState(state) {
    this.#state = state;
  }

  async fetchProducts() {
    try {
      const response = await fetch(this.#backend_url);
      const json = await response.json();
      console.log(json);
      this.#products = json.data;
      this.#state = json.data;
      return json;
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
      throw error;
    }
  }

  renderProducts() {
    const products_container = document.getElementById("products-container");
    products_container.innerHTML = "";
    const productsToRender = this.#state;

    console.log("x", products_container);
    productsToRender.forEach((product) => {
      const productItem = document.createElement("div");
      productItem.classList.add(
        "products-item",
        "col-12",
        "col-md-6",
        "col-lg-4"
      );

      const image = document.createElement("img");
      image.src = product.image;
      image.classList.add("img-fluid");

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("item-info-div");

      const nameParagraph = document.createElement("p");
      nameParagraph.textContent = product.product_name.toUpperCase();

      const priceParagraph = document.createElement("p");
      priceParagraph.textContent = product.price + "$";

      itemInfoDiv.appendChild(nameParagraph);
      itemInfoDiv.appendChild(priceParagraph);
      productItem.appendChild(image);
      productItem.appendChild(itemInfoDiv);
      products_container.appendChild(productItem);
    });
  }

  filterProducts(filterWord) {
    console.log("Filtering by", filterWord);

    const productsToFilter = [...this.#products];
    let filteredProducts = productsToFilter.filter(
      (product) => product.category_name == filterWord
    );
    if (filterWord === "all") {
      console.log("yes filter world!");
      filteredProducts = this.#products;
      console.log(this.#state, "STATE");
    }

    this.setState(filteredProducts);
    this.renderProducts();
    console.log("Filtered Products", filteredProducts);
    console.log("this", this);
  }
}

export default Products;
