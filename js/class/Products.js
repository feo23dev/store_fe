import ShoppingCart from "./ShoppingCart.js";
class Products {
  #backend_url = "http://localhost:5000/api/v1/products";
  #img_url = "http://localhost:5000";
  #products = [];
  #state;

  constructor() {
    this.#state = [];
    const cart = new ShoppingCart();
  }

  getProducts() {
    return this.#products;
  }

  addToShoppingCart(product) {}

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

        this.addProduct(json.data);
      }
    } catch (error) {
      console.log("ERROR CREATING PRODUCT");

      throw error;
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
      image.addEventListener("click", () => {
        const encodedProductData = encodeURIComponent(JSON.stringify(product));
        // Navigate to single_product.html with the product data encoded in the URL
        window.location.href = `single_product.html?product=${encodedProductData}`;
        // window.location.href = "single_product.html";
        // this.renderProductDetails(product);
      });

      const imageName = product.image.split("/")[4];

      image.src = this.#img_url + "/images/products/" + imageName;

      image.classList.add("img-fluid");

      const icon = document.createElement("i");
      icon.classList.add("bi", "bi-search", "img-icon");

      const itemInfoDiv = document.createElement("div");
      itemInfoDiv.classList.add("item-info-div");

      const nameParagraph = document.createElement("p");
      nameParagraph.classList.add("product-name");
      nameParagraph.textContent = product.product_name.toUpperCase();

      const priceDiv = document.createElement("div");
      priceDiv.classList.add("price-div");
      const priceParagraph = document.createElement("p");
      priceParagraph.classList.add("product-price");

      priceParagraph.textContent = "$" + product.price;

      itemInfoDiv.appendChild(nameParagraph);
      priceDiv.appendChild(priceParagraph);
      itemInfoDiv.appendChild(priceDiv);
      productItem.appendChild(image);
      productItem.appendChild(icon);
      productItem.appendChild(itemInfoDiv);

      products_container.appendChild(productItem);
    });
  }

  async renderProductDetails(product) {
    console.log("Product id", product.id);

    try {
      const productFromDB = await this.getProductById(product.id); // Create card elements
      const productDb = productFromDB.data[0];
      var cardWrapper = document.getElementById("card-wrapper");

      var card = document.createElement("div");
      card.classList.add("card");

      var productImgs = document.createElement("div");
      productImgs.classList.add("product-imgs");

      var imgDisplay = document.createElement("div");
      imgDisplay.classList.add("img-display");

      var imgShowcase = document.createElement("div");
      imgShowcase.classList.add("img-showcase");

      var img = document.createElement("img");

      const imageName = product.image.split("/")[4];

      img.src = this.#img_url + "/images/products/" + imageName;

      img.alt = "image";

      imgShowcase.appendChild(img);
      imgDisplay.appendChild(imgShowcase);
      productImgs.appendChild(imgDisplay);

      var productContent = document.createElement("div");
      productContent.classList.add("product-content");

      var productTitle = document.createElement("h2");
      productTitle.classList.add("product-title");
      productTitle.textContent = "Q STORE";

      var productLink = document.createElement("a");
      productLink.classList.add("product-link");
      productLink.href = "#";
      productLink.textContent = "visit Q store";

      var productPrice = document.createElement("div");
      productPrice.classList.add("product-price");
      productPrice.innerHTML = "<p>" + "$ " + product.price + "</p>";

      var productDetail = document.createElement("div");
      productDetail.classList.add("product-detail");
      productDetail.innerHTML =
        "<h2>about this item:</h2><h3>" +
        productDb.product_name +
        "</h3><p>" +
        productDb.description +
        "</p><ul><li>Category: <span >" +
        productDb.category_name.toUpperCase() +
        "</span></li><li>Company: <span>" +
        productDb.company_name.toUpperCase() +
        "</span></li></ul>";

      var purchaseInfo = document.createElement("div");
      purchaseInfo.classList.add("purchase-info");
      purchaseInfo.innerHTML =
        "<button type='button' class='btn' id='addtocartbutton'>Add to Cart <i class='fas fa-shopping-cart'></i></button>";

      const addToCartButton = document.getElementById("addtocartbutton");
      // addToCartButton.addEventListener("click", () => {
      //   console.log("Button Clicked! AND PRODUCT IS ADDED", product);
      //   cart.addItemToCart(product);
      // });
      productContent.appendChild(productTitle);
      productContent.appendChild(productLink);
      productContent.appendChild(productPrice);
      productContent.appendChild(productDetail);
      productContent.appendChild(purchaseInfo);

      card.appendChild(productImgs);
      card.appendChild(productContent);

      cardWrapper.appendChild(card);

      console.log("PRODUCT CAME FROM DATABASE", product);
    } catch (error) {
      console.log("ERROR FETCHING PRODUCT BY ID", error);
    }
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

  async getProductById(id) {
    try {
      const response = await fetch(`${this.#backend_url}/${id}`);
      const json = await response.json();
      console.log("ITEM FROM", json);
      return json;
    } catch (error) {
      console.log("ERROR FETCHING PRODUCT BY ID", error);
    }
  }
}

export default Products;
