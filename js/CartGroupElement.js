import { Cart } from "./Cart.js";
import { CartElementBuilder } from "./CartBuilder.js";

export class CartGroupElement {

    #cart = new Cart();

    constructor() {
        this.cartElementHolder = document.createElement("div");
        this.cartElementHolder.className = "cart-element-holder";

        let cartTitle = document.createElement("p");
        cartTitle.textContent = "Cart";
        this.cartElementHolder.appendChild(cartTitle);

        this.cardPrice = document.createElement("p");
        this.cardPrice.textContent = this.#cart.getPrice();
        
        this.cartElementHolder.appendChild(this.cardPrice);
    }

    #updateCartPrice = () => {
        this.cardPrice.textContent = this.#cart.getPrice();
    }

    addCartElement = (book) => {
        this.#cart.addBook(book);
        
        let cartElementBuilder = new CartElementBuilder();
        let cartElement = cartElementBuilder.author(book.author)
            .imageLink(book.imageLink)
            .title(book.title)
            .price(book.price)
            .description(book.description)
            .onItemRemove(() => {
                this.#cart.removeBook(book);
                this.cartElementHolder.removeChild(cartElement);
                this.#updateCartPrice();
            })
            .build();
        this.cartElementHolder.appendChild(cartElement);
        this.#updateCartPrice();
    }

    getElement = () => this.cartElementHolder;
}