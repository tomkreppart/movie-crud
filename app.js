const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');

var PORT = process.env.PORT || 5000;

app.use(express.static('./public', {index:"home.html"}))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use('/', routes);

app.listen(PORT, function () {
    console.log('Server listening on port: ' + PORT);
});
