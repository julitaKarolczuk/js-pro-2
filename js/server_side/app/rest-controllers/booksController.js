var books = require('../data/books');
var id = 4;

function findById(bookId) {
    var bookById;
    books.forEach(function (book) {
        if(book.bookId == bookId)
            bookById = book;
    });
    return bookById;
}

exports.findAll = function (req, res) {
    res.json(books);
};

exports.findOne = function (req, res) {
    var book = findById(req.params.id)
    book != undefined? res.json(book) : res.status(404).json(null);
};

exports.create = function (req, res) {
    var createdBook = req.body;
    createdBook.bookId = id++;
    books.push(createdBook);
    res.status(201).json(createdBook);
};

exports.update = function (req, res) {
    var book = findById(req.params.id);
    if (book == undefined)
        res.status(404).json(null);

    book.authors = req.body.authors;
    book.country = req.body.country;
    book.language = req.body.language;
    book.pages = req.body.pages;
    book.title = req.body.title;
    book.year = req.body.year;

    books.forEach(function (book, index) {
        if (book.bookId == req.params.id)
            books.splice(index, 1, book);
    });

    res.status(200).json(book);
};

exports.delete = function (req, res) {
    var existsId = false;
    books.forEach(function (book, index) {
       if(book.bookId == req.params.id) {
           books.splice(index, 1);
           existsId = true;
       }
    });
    existsId ? res.status(204).json(null) : res.status(404).json(null);
};
