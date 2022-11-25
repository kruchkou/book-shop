import { Cart } from "./Cart.js";
import { CartElementBuilder } from "./CartBuilder.js";

export class CartGroupElement {

    #cart = new Cart();

    constructor() {
        this.cartElementHolder = document.createElement("div");
        this.cartElementHolder.className = "cart-block card-secondary";

        let cartTitleBlock = document.createElement("div");
        cartTitleBlock.className = "cart-title";

        let cartImage = document.createElement("img");
        cartImage.setAttribute("src", "../../assets/images/icons/cart.svg");
        cartImage.setAttribute("id", "cart-icon");
        cartTitleBlock.appendChild(cartImage);

        let cartTitle = document.createElement("h2");
        cartTitle.className = "title";
        cartTitle.textContent = "Cart";
        cartTitleBlock.appendChild(cartTitle);

        this.dragNDropElement = this.buildDragNDropCartElement();
        this.cartElementHolder.addEventListener("dranenter", (e) => {
            e.preventDefault();
            setTimeout(() => {
                this.cartElementHolder.insertBefore(this.dragNDropElement, cartTitleBlock.nextSibling);
            }, 0);
        });

        this.cartElementHolder.addEventListener("dragover", (e) => {
            e.preventDefault();
            setTimeout(() => {
                this.cartElementHolder.insertBefore(this.dragNDropElement, cartTitleBlock.nextSibling);
            }, 0);
        });

        this.cartElementHolder.addEventListener("dragleave", (e) => {
            setTimeout(() => {
                this.cartElementHolder.removeChild(this.dragNDropElement);
            }, 0);
        });

        this.cartElementHolder.addEventListener("drop", (e) => {
            e.preventDefault();
            this.cartElementHolder.removeChild(this.dragNDropElement);
            let bookStr = e.dataTransfer.getData("text");
            this.addCartElement(JSON.parse(bookStr));
        });

        this.cartElementHolder.appendChild(cartTitleBlock);
        this.cartPriceBlock = document.createElement("div");
        this.cartPriceBlock.className = "cartPriceBlock";
        this.#updateCartPrice();

        this.cartElementHolder.appendChild(this.cartPriceBlock);
    }

    #updateCartPrice = () => {
        if (this.cartPriceContent) {
            this.cartPriceBlock.removeChild(this.cartPriceContent);
        }
        let price = this.#cart.getPrice();
        if (price == 0) {
            this.cartPriceContent = document.createElement("h3");
            this.cartPriceContent.className = "block-title";
            this.cartPriceContent.textContent = "The cart is empty";
            this.cartPriceBlock.appendChild(this.cartPriceContent);
        }
        else {
            this.cartPriceContent = document.createElement("div");
            this.cartPriceContent.className = "cart-price-content";

            let cartPriceText = document.createElement("h3");
            cartPriceText.className = "block-title";
            cartPriceText.textContent = "Total amount: " + price + "$";
            this.cartPriceContent.appendChild(cartPriceText);

            let cartOrderButton = document.createElement("a");
            cartOrderButton.className = "btn";
            cartOrderButton.textContent = "Checkout";
            cartOrderButton.href = "../checkout";
            this.cartPriceContent.appendChild(cartOrderButton);

            this.cartPriceBlock.appendChild(this.cartPriceContent);
        }
    }

    buildDragNDropCartElement = () => {
        let bookCard = document.createElement("div");
        bookCard.className = "card cart-card";

        let bookTextBlock = document.createElement("div");
        bookTextBlock.className = "book-text-block"

        let bookImage = document.createElement("img");
        bookImage.className = "cart-image empty-image";
        bookImage.setAttribute("src", "../../assets/images/transparent.png")

        let bookTitle = document.createElement("p");
        bookTitle.className = "book-title";
        bookTitle.textContent = "Add this book to your cart"

        let bookAuthor = document.createElement("p");
        bookAuthor.className = "book-author";
        bookAuthor.textContent = "Add to cart"

        bookTextBlock.appendChild(bookAuthor);
        bookTextBlock.appendChild(bookTitle);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTextBlock);
        return bookCard;
    }

    addCartElement = (book) => {
        this.#cart.addBook(book);

        let cartElementBuilder = new CartElementBuilder();
        let cartElement = cartElementBuilder.author(book.author)
            .imageLink(book.imageLink)
            .title(book.title)
            .price(book.price + "$")
            .description(book.description)
            .onItemRemove(() => {
                this.#cart.removeBook(book);
                this.cartElementHolder.removeChild(cartElement);
                this.#updateCartPrice();
            })
            .build();
        this.cartElementHolder.insertBefore(cartElement, this.cartElementHolder.lastChild);
        this.#updateCartPrice();
    }

    getElement = () => this.cartElementHolder;
}