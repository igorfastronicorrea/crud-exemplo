const ProdutoModel = require('../models/ProdutoModel');

exports.list = async () => {

    try {
        let produtos = await ProdutoModel.find({});
        return produtos;
    } catch (err) {
        return undefined;
    }
}

exports.create = async (data) => {
    try {
        var response = await ProdutoModel.create(data);
        return response;
    } catch (err) {
        return undefined;
    }
}