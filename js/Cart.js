export class Cart {
    
    books = [];

    addBook = (book) => {
        this.books.push(book);
    }

    removeBook = (book) => {
        let bookIndex = this.books.indexOf(book);
        this.books.splice(bookIndex, 1);
    }

    getPrice = () => {
        let price = 0;
        this.books.forEach(book => {
            price += book.price;
        })
        return price;
    }
}