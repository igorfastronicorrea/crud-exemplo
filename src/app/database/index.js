const mongoose = require('mongoose');

mongoose.set('useCreateIndex', true);
//mongoose.connect('mongodb+srv://dbuser:db1234@cluster0.2sros.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.connect('mongodb://localhost/easytraining', { useNewUrlParser: true, useUnifiedTopology: true });
//teste
mongoose.Promise = global.Promise;

module.exports = mongoose