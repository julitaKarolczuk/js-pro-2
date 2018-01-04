module.exports = function(app){
    var books = require('../rest-controllers/booksController');
    app.get('/book/all', books.findAll);
    app.get('/book/:id', books.findOne);
    app.post('/book/create', books.create);
    app.put('/book/:id/update', books.update);
    app.delete('/book/:id/delete', books.delete);
};