class ShoppingCart {
  constructor() {
    this.items = [];
  }

  addItemToCart(item) {
    this.items.push(item);
  }
}

export default ShoppingCart;
