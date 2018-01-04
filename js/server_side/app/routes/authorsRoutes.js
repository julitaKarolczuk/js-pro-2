module.exports = function(app){
    var authors = require('../rest-controllers/authorsController');
    app.get('/author/all', authors.findAll);
    app.get('/author/:id', authors.findOne);
    app.post('/author/create', authors.create);
    app.put('/author/:id/update', authors.update);
    app.delete('/author/:id/delete', authors.delete);
};