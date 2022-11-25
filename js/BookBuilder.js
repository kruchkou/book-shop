import { Book } from "./Book.js";

export class BookElementBuilder {
    book = new Book();

    author = (author) => {
        this.book.author = author;
        return this;
    };

    title = (title) => {
        this.book.title = title;
        return this;
    }

    imageLink = (imageLink) => {
        this.book.imageLink = imageLink;
        return this;
    }

    price = (price) => {
        this.book.price = price;
        return this;
    }

    description = (description) => {
        this.book.description = description;
        return this;
    }

    onAddToCard = (func) => {
        this.addToCardEvent = func;
        return this;
    }

    onShowMore = (func) => {
        this.showMore = func;
        return this;
    }

    build = () => {
        let bookCard = document.createElement("div");
        bookCard.className = "book-card card";
        bookCard.setAttribute("draggable", "true");

        bookCard.addEventListener("dragstart", (e) => this.dragStart(e, this.book));

        let bookTextBlock = document.createElement("div");
        bookTextBlock.className = "book-text-block"

        let bookImage = document.createElement("img");
        bookImage.className = "book-image";
        bookImage.setAttribute("src", this.book.imageLink)

        let bookTitle = document.createElement("p");
        bookTitle.className = "book-title";
        bookTitle.textContent = this.book.title;

        let bookAuthor = document.createElement("p");
        bookAuthor.className = "book-author";
        bookAuthor.textContent = this.book.author;

        let bookBtnWrapper = document.createElement("div");
        bookBtnWrapper.className = "btn-block";

        let bookShowMoreButton = document.createElement("button");
        bookShowMoreButton.className = "btn";
        bookShowMoreButton.textContent = "Show more";

        if (this.showMore) {
            bookShowMoreButton.addEventListener("click", this.showMore);
        }

        let bookAddBlock = document.createElement("div");
        bookAddBlock.className = "btn-primary btn-text-block";

        let bookPrice = document.createElement("p");
        bookPrice.className = "book-price";
        bookPrice.textContent = this.book.price + "$";

        let bookAddButton = document.createElement("button");
        bookAddButton.className = "btn-group-button";
        bookAddButton.textContent = "Add to cart";

        if (this.addToCardEvent) {
            bookAddBlock.addEventListener("click", this.addToCardEvent);
        }

        bookAddBlock.appendChild(bookPrice);
        bookAddBlock.appendChild(bookAddButton);
        bookBtnWrapper.appendChild(bookShowMoreButton);
        bookBtnWrapper.appendChild(bookAddBlock);

        bookTextBlock.appendChild(bookAuthor);
        bookTextBlock.appendChild(bookTitle);
        bookTextBlock.appendChild(bookBtnWrapper);

        bookCard.appendChild(bookImage);
        bookCard.appendChild(bookTextBlock);
        return bookCard;
    }

    dragStart(e, book) {
        e.dataTransfer.setData('text/plain', JSON.stringify(book));
    }

}