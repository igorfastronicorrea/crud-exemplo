const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const cors = require('cors');

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api/', routes);
app.use(cors());
app.use(express.static('public'));

module.exports = app;