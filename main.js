import { BookElementBuilder } from "./js/BookBuilder.js";
import { Cart } from "./js/Cart.js";
import { Book } from "./js/Book.js";
import { CartElementBuilder } from "./js/CartBuilder.js";
import { CartGroupElement } from "./js/CartGroupElement.js";

document.addEventListener("DOMContentLoaded", () => {
    let main = document.querySelector("#mainDiv");

    let cartElement = new CartGroupElement();

    fetch('books.json') //path to the file with json data
        .then(response => {
            return response.json();
        })
        .then(data => createBookBlock(data));

    main.appendChild(cartElement.getElement());

    function createBookBlock(bookData) {
        let bookBlock = document.createElement("div");
        bookBlock.className = "book-block";

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
                .build();
            main.appendChild(book);
        });

        main.appendChild(bookBlock);
    }

});