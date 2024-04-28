import ShoppingCart from "./ShoppingCart.js";
class Checkout {
  constructor() {
    this.cart = new ShoppingCart();
    this.checkoutItems = this.cart.items;
  }

  createProduct() {
    console.log("Running the function,", this.checkoutItems);
    const asideElement = document.querySelector(".ware");
    const globalPriceParagraph = document.createElement("p");
    globalPriceParagraph.classList.add("global__price");
    globalPriceParagraph.innerHTML = `<span>Total</span> <span class="quantity__total">${this.cart.total}</span>`;
    this.checkoutItems.map((item) => {
      // Create div element with class "ware__item"
      const wareItemDiv = document.createElement("div");
      wareItemDiv.classList.add("ware__item");

      // Create figure element with class "item__figure"
      const figureElement = document.createElement("figure");
      figureElement.classList.add("item__figure");

      // Create img element with class "item__img" and set src and alt attributes
      const imgElement = document.createElement("img");

      const imageName = item.image.split("/")[4];

      imgElement.src =
        "http://localhost:5000" + "/images/products/" + imageName;

      imgElement.classList.add("item__img");
      // imgElement.src = "images/1.jpg";
      imgElement.alt = item.product_name;

      // Create figcaption element with class "item__figure__figcaption" and text content
      const figcaptionElement = document.createElement("figcaption");
      figcaptionElement.classList.add("item__figure__figcaption");
      figcaptionElement.textContent = item.product_name;

      // Create p element with class "item__figure__price"
      const priceParagraph = document.createElement("p");
      priceParagraph.classList.add("item__figure__price");
      priceParagraph.textContent = "$  " + item.price * item.amount;

      // Create div element with class "item__cont__btns"
      const btnsDiv = document.createElement("div");
      btnsDiv.classList.add("item__cont__btns");

      // Create label element with class "ware__hide-label", set "for" attribute, and text content
      const labelElement = document.createElement("label");
      labelElement.classList.add("ware__hide-label");
      labelElement.setAttribute("for", "backbag-qty");

      // Create input element with specified attributes
      const inputElement = document.createElement("input");
      inputElement.type = "number";
      inputElement.name = "backbag-qty";
      inputElement.id = "backbag-qty";
      inputElement.classList.add("ware__input", "ware__input--item-1");
      inputElement.min = 1;
      inputElement.value = item.amount;

      // Append created elements as per the structure

      btnsDiv.appendChild(labelElement);
      btnsDiv.appendChild(inputElement);

      figureElement.appendChild(imgElement);
      figureElement.appendChild(figcaptionElement);
      figureElement.appendChild(priceParagraph);
      figureElement.appendChild(btnsDiv);

      wareItemDiv.appendChild(figureElement);

      // Append the created "ware__item" div inside the existing aside element with class "ware"
      asideElement.appendChild(wareItemDiv);
    });
    asideElement.appendChild(globalPriceParagraph);
  }
}

export default Checkout;
