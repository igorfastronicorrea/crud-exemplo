const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const routes = require('./routes');
const cors = require('cors');
var path = require('path');
require("dotenv").config();

app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
    res.header("Access-Control-Allow-Methods", "*");
    next();
});
app.use('/exercises', express.static('exercises'));
app.use('/trainings', express.static('trainings'));

app.use('/api/', routes);


module.exports = app;