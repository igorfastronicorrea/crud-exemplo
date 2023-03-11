const ProdutoRepository = require('../../repositories/ProdutoRepository');

exports.get = async (req, res) => {

    try {
        var produtos = await ProdutoRepository.list();

        return res.status(200).send({ produtos });
    } catch (e) {
        print("deu falha aqui");
        return res.status(500).send("falha");
    }
}

exports.post = async (req, res) => {
    try {
        console.log(req.body);
        var response = await ProdutoRepository.create(req.body);
        return res.status(200).send({ message: "produto criado com sucesso" });
    } catch (err) {
        console.log(err)
        return res.status(500).send("falhou");
    }
}

//200s
//500