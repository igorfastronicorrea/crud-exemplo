const Fono = require('../../models/FonoModel');
const repository = require('../../repositores/FonoRespository');


exports.post = async (req, res) => {

    try {
        console.log(req.body)
        res.status(200).send("sucesso");

    } catch (err) {
        res.status(500).send({ "message": "error" });
    }
}
