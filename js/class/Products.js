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
  getState() {
    return this.#state;
  }

  addProduct(product) {
    this.#products.push(product);
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

  async createProduct(formData, userToken) {
    try {
      const response = await fetch(`${this.#backend_url}/create`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${userToken}`,
        },
        body: formData,
      });

      const json = await response.json();
      if (response.ok) {
        alert("Product created successfully", json.data);
        console.log("JSON", json.data);
        this.addProduct(json.data);
      }
    } catch (error) {
      console.log("ERROR CREATING PRODUCT");
      console.log(error);
    }
  }

  renderProducts() {
    console.log("RENDER PRODUCTS RUN");
    const products_container = document.getElementById("products-container");
    const paragraphContainer = document.getElementById("sort-bar");

    products_container.innerHTML = "";

    const productsToRender = this.#state;

    // Sort the productsToRender

    //
    const quantityParagraph = document.getElementById("quantity-p");
    const number = this.#state.length;
    quantityParagraph.textContent = "";
    quantityParagraph.textContent = number + " items found";

    // productItem.appendChild(quantityParagraph);
    paragraphContainer.insertBefore(
      quantityParagraph,
      paragraphContainer.firstChild
    );
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

      const icon = document.createElement("i");
      icon.classList.add("bi", "bi-search", "img-icon");

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("item-info-div");

      const nameParagraph = document.createElement("p");
      nameParagraph.classList.add("product-name");
      nameParagraph.textContent = product.product_name.toUpperCase();

      const priceParagraph = document.createElement("p");
      priceParagraph.classList.add("product-price");
      const formattedPrice = product.price.slice(0, -1);
      priceParagraph.textContent = "$" + formattedPrice;

      itemInfoDiv.appendChild(nameParagraph);
      itemInfoDiv.appendChild(priceParagraph);
      productItem.appendChild(image);
      productItem.appendChild(icon);
      productItem.appendChild(itemInfoDiv);

      products_container.appendChild(productItem);
    });
  }

  filterProducts(filterWord) {
    const productsToFilter = [...this.#products];
    let filteredProducts = productsToFilter.filter(
      (product) => product.category_name == filterWord
    );
    if (filterWord === "all") {
      filteredProducts = this.#products;
    }

    this.setState(filteredProducts);
    this.sortProducts();
  }

  sortProducts() {
    console.log("SORRT PRODUCTS RUN");
    const dropdown = document.getElementById("sort-dropdown");
    const sortBy = dropdown.value;
    const copyState = this.getState();
    if (sortBy === "price-lowest") {
      const sortedState = copyState.sort((a, b) => a.price - b.price);
      this.setState(sortedState);
    }
    if (sortBy === "price-highest") {
      const sortedState = copyState.sort((a, b) => b.price - a.price);
      this.setState(sortedState);
    }

    this.renderProducts();
  }

  searchProducts(searchWord) {
    const productsToSearch = [...this.#products];
    let searchedProducts = productsToSearch.filter((product) =>
      product.product_name.toLowerCase().includes(searchWord)
    );
    this.setState(searchedProducts);
    this.renderProducts();
  }
}

export default Products;
