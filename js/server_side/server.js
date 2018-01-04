var express = require('express');
var bodyParser = require('body-parser');

var app = express();
var cors = require('cors')

app.use(cors());

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
  });

app.get('/', function(req, res) {
    res.send('server works');
});

require('./app/routes/booksRoutes')(app);
require('./app/routes/authorsRoutes')(app);


app.listen(3001);
console.log('Listening on port 3001...');
