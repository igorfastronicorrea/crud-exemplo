const repository = require('../../repositories/PatientRepository');
const decodeToken = require('../../services/decodedService');

exports.post = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        var data = { ...req.body, fonoId }

        const dataPatientCreated = await repository.create(data);
        dataPatientCreated.password = undefined;

        if (dataPatientCreated != undefined) {
            res.status(200).send({ patient: dataPatientCreated });
        } else {
            res.status(500).send({ "message": "error create patient, username already exist" });
        }

    } catch (err) {
        console.log(err)
        res.status(500).send({ "message": "error create patient" });
    }
}

exports.get = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        var data = await repository.list(fonoId);
        res.status(200).send({ patients: data });
    } catch (err) {
        res.status(500).send({ "message": "error patients list" });
    }
}