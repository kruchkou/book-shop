import { Book } from "./Book.js";

export class BookElementBuilder {
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

    onAddToCard = (func) => {
        this.addToCardEvent = func;
        return this;
    }

    build = () => {
        let bookCard = document.createElement("div");
        bookCard.className = "book-card";

        let bookTextBlock = document.createElement("div");
        bookTextBlock.className = "book-text-block"

        let bookImage = document.createElement("img");
        bookImage.className = "book-image";
        bookImage.setAttribute("src", this.imageLink)

        let bookTitle = document.createElement("p");
        bookTitle.className = "book-title";
        bookTitle.textContent = this.title;

        let bookAuthor = document.createElement("p");
        bookAuthor.className = "book-author";
        bookAuthor.textContent = this.author;
        
        let bookDescription = document.createElement("p");
        bookDescription.className = "book-description";
        bookDescription.textContent = this.description;

        let bookAddBlock = document.createElement("div");
        bookAddBlock.className = "book-add-block btn-text-block";

        let bookPrice = document.createElement("p");
        bookPrice.className = "book-price";
        bookPrice.textContent = this.price;

        let bookAddButton = document.createElement("button");
        bookAddButton.className = "btn-group-button";
        bookAddButton.textContent = "Add to cart";

        if(this.addToCardEvent) {
            bookAddBlock.addEventListener("click", this.addToCardEvent);
        }

        bookAddBlock.appendChild(bookPrice);
        bookAddBlock.appendChild(bookAddButton);

        bookTextBlock.appendChild(bookTitle);
        bookTextBlock.appendChild(bookAuthor);
        bookTextBlock.appendChild(bookDescription);
        bookTextBlock.appendChild(bookAddBlock);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTextBlock);
        return bookCard;
    }

}