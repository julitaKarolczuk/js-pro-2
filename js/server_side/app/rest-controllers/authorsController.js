var authors = require('../data/authors');
var id = 5;

function findById(authorId) {
    var authorById;
    authors.forEach(function (author) {
        if(author.authorId == authorId)
            authorById = author;
    });
    return authorById;
}

exports.findAll = function (req, res) {
    res.json(authors);
};

exports.findOne = function (req, res) {
    var author = findById(req.params.id)
    author != undefined? res.json(author) : res.status(404).json(null);
};

exports.create = function (req, res) {
    var createdAuthor = req.body;
    createdAuthor.authorId = id++;
    authors.push(req.body);
    res.status(201).json(createdAuthor);
};

exports.update = function (req, res) {
    var author = findById(req.params.id);
    if(author == undefined)
        res.status(404).json(null);

    author.firstName = req.body.firstName;
    author.lastName = req.body.lastName;
    author.description = req.body.description;

    authors.forEach(function (author, index) {
        if(authors.authorId == req.params.id)
            authors.splice(index, 1, author);
    });

    res.status(200).json(author)
};

exports.delete = function (req, res) {
    var existsId = false;
    authors.forEach(function (author, index) {
        if(author.authorId == req.params.id) {
            authors.splice(index, 1);
            existsId = true;
        }
    });
    existsId ? res.status(204).json(null) : res.status(404).json(null);
};
