import { Book } from "./Book.js";

export class CartElementBuilder {
    book = new Book();

    author = (author) => {
        this.author = author;
        return this;
    };

    title = (title) => {
        this.title = title;
        return this;
    }

    imageLink = (imageLink) => {
        this.imageLink = imageLink;
        return this;
    }

    price = (price) => {
        this.price = price;
        return this;
    }

    description = (description) => {
        this.description = description;
        return this;
    }

    onItemRemove = (func) => {
        this.removeItemFunc = func;
        return this;
    }

    build = () => {
        let bookCard = document.createElement("div");
        bookCard.className = "card cart-card";

        let bookTextBlock = document.createElement("div");
        bookTextBlock.className = "book-text-block"

        let bookImage = document.createElement("img");
        bookImage.className = "cart-image";
        bookImage.setAttribute("src", this.imageLink)

        let bookTitle = document.createElement("p");
        bookTitle.className = "book-title";
        bookTitle.textContent = this.title;

        let bookAuthor = document.createElement("p");
        bookAuthor.className = "book-author";
        bookAuthor.textContent = this.author;

        let bookAddBlock = document.createElement("div");
        bookAddBlock.className = "btn-text-block btn-primary";

        let bookPrice = document.createElement("p");
        bookPrice.className = "book-price";
        bookPrice.textContent = this.price;

        let bookAddButton = document.createElement("button");
        bookAddButton.className = "btn-group-button";
        bookAddButton.textContent = "Remove from cart";

        bookAddBlock.addEventListener("click", this.removeItemFunc);

        bookAddBlock.appendChild(bookPrice);
        bookAddBlock.appendChild(bookAddButton);

        bookTextBlock.appendChild(bookAuthor);
        bookTextBlock.appendChild(bookTitle);
        bookTextBlock.appendChild(bookAddBlock);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTextBlock);
        return bookCard;
    }

}