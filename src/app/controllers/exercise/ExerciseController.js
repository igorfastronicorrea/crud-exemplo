const repository = require('../../repositories/ExerciseRepository');

exports.postCreateExercise = async (req, res) => {

    try {
        var data = await repository.create(req.body);

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
        var data = await repository.list(req.query.fonoId);
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