import { BookElementBuilder } from "../../js/BookBuilder.js";
import { Cart } from "../../js/Cart.js";
import { Book } from "../../js/Book.js";
import { CartElementBuilder } from "../../js/CartBuilder.js";
import { CartGroupElement } from "../../js/CartGroupElement.js";

document.addEventListener("DOMContentLoaded", () => {
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
});