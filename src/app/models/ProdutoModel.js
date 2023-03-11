const mongoose = require('../database');
const bcryptjs = require('bcryptjs');

const ProdutoSchema = new mongoose.Schema({
    nome: {
        type: String,
        require: true
    },
    preco: {
        type: Number
    },
},
    {
        versionKey: false
    }
)
const produto = mongoose.model('produtos', ProdutoSchema, 'produtos');


module.exports = produto;