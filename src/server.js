const app = require('./app');
const http = require('http');
var fs = require("fs");

http.createServer(app).listen(process.env.PORT || 3333);




