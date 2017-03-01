const express = require('express');
const app = express();
const routes = require('./routes.js');
const bodyParser = require('body-parser');

app.use(express.static('./public', {index:"home.html"}))
app.use(bodyParser.urlencoded({ extended: false}))
app.use(bodyParser.json());
app.use('/', routes);

app.listen(5000, function () {
    console.log('Server listening on port 5000');
});
