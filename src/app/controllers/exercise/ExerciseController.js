const repository = require('../../repositories/ExerciseRepository');
const decodeToken = require('../../services/decodedService');

exports.postCreateExercise = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        objectExercise = { ...req.body, fonoId };

        var data = await repository.create(objectExercise);

        if (data != undefined) {
            res.status(200).send({ exercise: data });
        } else {
            res.status(500).send({ "message": "error create exercise" });
        }

    } catch (err) {
        res.status(500).send({ "message": "error create exercise" });
    }
}


exports.getExercises = async (req, res) => {
    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        var data = await repository.list(fonoId);
        res.status(200).send({ exercises: data });
    } catch (err) {
        res.status(500).send({ "message": "error load exercises" })
    }
}

exports.getExercise = async (req, res) => {
    try {
        var data = await repository.detail(req.params.idExercise);
        res.status(200).send({ exercise: data });
    } catch (err) {
        res.status(500).send({ "message": "" })
    }
}