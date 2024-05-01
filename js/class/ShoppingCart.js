class ShoppingCart {
  #total = 0;
  constructor() {
    this.items = this.getItemsFromStorage();
    this.#total = this.setTotal();
  }
  addItemToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.items));
  }
  updateItems() {
    this.items = this.getItemsFromStorage();
    this.setTotal();
  }

  refreshLocalStorage() {
    const filteredItems = this.items.filter((item) => item.amount > 0);
    this.items = filteredItems;
    localStorage.setItem("shoppingCart", JSON.stringify(filteredItems));
  }

  addItemToCart(item) {
    // Check if the item already exists in the cart

    const existingItem = this.items.find((cartItem) => cartItem.id === item.id);
    if (existingItem) {
      // If the item already exists, increment the amount
      existingItem.amount++;

      console.log("yes item already exists!", existingItem.amount);
    } else {
      // If the item does not exist, add it with amount 1
      console.log("No item does not exist!");

      item.amount = 1;
      this.items.push(item);
    }
    this.#total += Number(item.price);

    this.renderData();
    // Update the local storage

    this.addItemToLocalStorage();
  }

  setTotal() {
    this.#total = 0;
    this.items.forEach((item) => {
      this.#total += Number(item.price) * item.amount;
    });
    return this.#total;
  }
  get total() {
    return this.#total;
  }

  getItemsFromStorage() {
    return JSON.parse(localStorage.getItem("shoppingCart")) || [];
  }

  renderData() {
    let listProducts = document.querySelector(".listCart");
    let total = document.querySelector(".total-p");
    total.textContent = "TOTAL : " + "$" + this.total;
    listProducts.innerHTML = "";
    if (this.items.length === 0) {
      listProducts.innerHTML = ` <h2 class="empty-card">Your cart is empty</h2>`;
      return;
    }
    this.items.forEach((product) => {
      if (product.amount > 0) {
        console.log("ITEM 1 ", product);
        let newProduct = document.createElement("div");

        newProduct.classList.add("item");

        let image = document.createElement("img");
        const imageName = product.image.split("/")[4];

        image.src = "http://localhost:5000" + "/images/products/" + imageName;
        image.alt = "image";
        newProduct.appendChild(image);

        let name = document.createElement("div");
        name.classList.add("name");
        name.textContent = product.product_name;
        newProduct.appendChild(name);

        let price = document.createElement("div");
        price.classList.add("price");
        price.textContent = "$ " + product.price * product.amount;
        newProduct.appendChild(price);

        let minusSpan = document.createElement("span");
        minusSpan.textContent = "-";
        minusSpan.classList.add("minus");
        minusSpan.addEventListener("click", () => {
          product.amount--;
          this.refreshLocalStorage();
          if (this.#total > 0) {
            this.#total -= Number(product.price);
          }
          if (product.amount <= 0) {
            this.renderData();
          }
          this.renderData();
        });

        let quantityDiv = document.createElement("div");
        let quantity = document.createElement("span");

        quantityDiv.classList.add("quantity");
        quantity.textContent = product.amount;

        let plusSpan = document.createElement("span");
        plusSpan.textContent = "+";
        plusSpan.classList.add("plus");
        plusSpan.addEventListener("click", () => {
          this.#total += Number(product.price);
          product.amount++;
          this.renderData();
        });

        quantityDiv.appendChild(minusSpan);
        quantityDiv.appendChild(quantity);
        quantityDiv.appendChild(plusSpan);
        newProduct.appendChild(quantityDiv);
        listProducts.appendChild(newProduct);
        localStorage.setItem("shoppingCart", JSON.stringify(this.items));
      }
    });
  }
}

export default ShoppingCart;
