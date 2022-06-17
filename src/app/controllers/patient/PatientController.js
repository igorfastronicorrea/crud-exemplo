const repository = require('../../repositories/PatientRepository');

exports.post = async (req, res) => {

    try {
        var data = await repository.create(req.body);

        if (data != undefined) {
            res.status(200).send({ fono: data });
        } else {
            res.status(500).send({ "message": "error create patient, username already exist" });
        }

    } catch (err) {
        res.status(500).send({ "message": "error create fono" });
    }
}

exports.get = async (req, res) => {

    try {
        var data = await repository.list(req.query.fonoId);
        res.status(200).send({ patients: data });
    } catch (err) {
        res.status(500).send({ "message": "error patients list" });
    }
}

function sleep(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}

exports.testRiba = async (req, res) => {

    try {
        //var data = await repository.list(req.query.fonoId);
        res.status(200).send({ version: "0.0.1" });
    } catch (err) {
        res.status(500).send({ "message": "error patients list" });
    }
}