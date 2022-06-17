const Fono = require('../../models/FonoModel');
const repository = require('../../repositories/FonoRepository');

exports.post = async (req, res) => {

    try {
        var data = await repository.create(req.body);

        if (data != undefined) {
            res.status(200).send({ fono: data });
        } else {
            res.status(500).send({ "message": "error create fono, username already exist" });
        }

    } catch (err) {
        res.status(500).send({ "message": "erro create fono" });
    }
}

exports.get = async (req, res) => {

    try {
        var data = await repository.list();
        res.status(200).send({ fono: data });
    } catch (err) {
        res.status(500).send({ "message": "error fono list" });
    }
}