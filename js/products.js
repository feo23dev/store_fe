// import dataArray from "./data.js";
// console.log("Here");
// console.log(dataArray);

class Products {
  #backend_url = "http://localhost:5000/api/v1/products";
  #products = [];
  constructor() {}

  getProducts() {
    return this.#products;
  }

  async fetchProducts() {
    try {
      const response = await fetch(this.#backend_url);
      const json = await response.json();
      console.log(json);
      this.#products = json.data;
      return json;
    } catch (error) {
      console.log("ERROR FETCHING PRODUCTS", error);
      throw error;
    }
  }
}

export default Products;
