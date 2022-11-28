import { Cart } from "../../js/Cart.js";
import { Book } from "../../js/Book.js";
import { CartElementBuilder } from "../../js/CartBuilder.js";

document.addEventListener("DOMContentLoaded", () => {

    class CartGroupElement {

        #cart = new Cart();

        constructor() {
            this.cartElementHolder = document.createElement("div");
            this.cartElementHolder.className = "cart-block card-secondary";

            this.cartTitleBlock = document.createElement("div");
            this.cartTitleBlock.className = "cart-title";

            let cartImage = document.createElement("img");
            cartImage.setAttribute("src", "../../assets/images/icons/cart.svg");
            cartImage.setAttribute("id", "cart-icon");
            this.cartTitleBlock.appendChild(cartImage);

            let cartTitle = document.createElement("h2");
            cartTitle.className = "title";
            cartTitle.textContent = "Cart";
            this.cartTitleBlock.appendChild(cartTitle);

            this.dragNDropElement = this.buildDragNDropCartElement();

            this.cartElementHolder.addEventListener("dranenter", (e) => {
                e.preventDefault();
            });

            this.cartElementHolder.addEventListener("dragover", (e) => {
                e.preventDefault();
            });

            this.cartElementHolder.addEventListener("dragleave", (e) => {
            });

            this.cartElementHolder.addEventListener("drop", (e) => {
                e.preventDefault();
                let bookStr = e.dataTransfer.getData("text");
                this.addCartElement(JSON.parse(bookStr));
            });

            this.cartElementHolder.appendChild(this.cartTitleBlock);
            this.cartPriceBlock = document.createElement("div");
            this.cartPriceBlock.className = "cartPriceBlock";
            this.#updateCartPrice();

            this.cartElementHolder.appendChild(this.cartPriceBlock);
        }

        showDragNDropElement = () => {
            this.cartElementHolder.insertBefore(this.dragNDropElement, this.cartTitleBlock.nextSibling);
        }

        hideDragNDropElement = () => {
            this.cartElementHolder.removeChild(this.dragNDropElement);
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
            this.cartElementHolder.insertBefore(cartElement, this.cartTitleBlock.nextSibling);
            this.#updateCartPrice();
        }

        getElement = () => this.cartElementHolder;
    }

    let main = document.querySelector("#mainDiv");

    let content = document.createElement("div");
    content.className = "content";

    let cartElement = new CartGroupElement();
    let fragment = new DocumentFragment();

    let header = document.createElement("header");
    header.id = "header";
    header.className = "card-secondary";

    let headerLogo = document.createElement("h2");
    headerLogo.id = "header-logo";
    headerLogo.className = "title";
    headerLogo.textContent = "Book Shop";

    header.appendChild(headerLogo);
    fragment.append(header);

    fetch('books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => {
            content.append(createBookBlock(data));
            content.append(cartElement.getElement());
            fragment.append(content);
            main.appendChild(fragment);
        });

    function createBookBlock(bookData) {

        let bookBlock = document.createElement("div");
        bookBlock.className = "book-block card-secondary";

        let bookGrid = document.createElement("div");
        bookGrid.className = "book-grid";

        let bookBlockTitle = document.createElement("h1");
        bookBlockTitle.className = "title block-title";
        bookBlockTitle.textContent = "Availiable books"
        bookBlock.appendChild(bookBlockTitle);

        bookData.forEach(element => {
            let bookBuilder = new BookElementBuilder();
            let book = bookBuilder.author(element.author)
                .imageLink(element.imageLink)
                .title(element.title)
                .price(element.price)
                .description(element.description)
                .onAddToCard(() => {
                    cartElement.addCartElement(element);
                })
                .onShowMore(() => {
                    let showMoreDialog = getShowMoreDialog(element.title, element.description, () => {
                        content.removeChild(showMoreDialog);
                    });
                    content.appendChild(showMoreDialog);
                })
                .build();
            bookGrid.appendChild(book);
        });
        bookBlock.appendChild(bookGrid);
        return bookBlock;
    }

    function getShowMoreDialog(title, description, onClose) {
        let dialog = document.createElement("div");
        dialog.className = "modal-group";

        let dialogCard = document.createElement("div");
        dialogCard.className = "modal-popup card";

        let dialogTitleGroup = document.createElement("div");
        dialogTitleGroup.className = "modal-popup-title-group";

        let dialogTitle = document.createElement("h3");
        dialogTitle.className = "modal-popup-title";
        dialogTitle.textContent = title;

        let dialogCloseIcon = document.createElement("img");
        dialogCloseIcon.className = "modal-popup-close-icon";
        dialogCloseIcon.setAttribute("src", "../../assets/images/icons/close.svg");
        dialogCloseIcon.addEventListener("click", onClose);

        dialogTitleGroup.appendChild(dialogTitle);
        dialogTitleGroup.appendChild(dialogCloseIcon);

        dialogCard.appendChild(dialogTitleGroup);

        let dialogDescription = document.createElement("p");
        dialogDescription.className = "modal-popup-description";
        dialogDescription.textContent = description;

        dialogCard.appendChild(dialogDescription);

        dialog.appendChild(dialogCard);
        return dialog;
    }
    class BookElementBuilder {
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

            bookCard.addEventListener("dragstart", (e) => {
                this.dragStart(e, this.book);
            });

            bookCard.addEventListener("dragend", () => {
                cartElement.hideDragNDropElement();
            });


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
            cartElement.showDragNDropElement();
        }
    }
});