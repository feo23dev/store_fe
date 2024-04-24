class ShoppingCart {
  #total = 0;
  constructor() {
    this.items = JSON.parse(localStorage.getItem("shoppingCart")) || [];
    this.#total = this.setTotal();
  }
  addItemToLocalStorage() {
    localStorage.setItem("shoppingCart", JSON.stringify(this.items));
  }

  addItemToCart(item) {
    this.items.push(item);
    this.addItemToLocalStorage();
  }

  setTotal() {
    this.items.forEach((item) => {
      this.#total += Number(item.price);
    });
    return this.#total;
  }
}

export default ShoppingCart;
