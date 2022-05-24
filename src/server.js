const app = require('./app');
const https = require('https');
var fs = require("fs");

//https.createServer(app).listen(3333);

https
  .createServer(
    {
      key: fs.readFileSync("key.pem"),
      cert: fs.readFileSync("cert.pem"),
    },
    app
  )
  .listen(3333, function () {
    console.log(
      "Example app listening on port 3000! Go to https://localhost:3333/"
    );
  });