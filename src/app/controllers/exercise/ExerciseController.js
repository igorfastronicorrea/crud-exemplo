const repository = require('../../repositories/ExerciseRepository');
const decodeToken = require('../../services/decodedService');

exports.postCreateExercise = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        //Criando exercise audio url hardcoded
        //TODO converter o base 64 para audio e gravar aqui
        var exampleAudioUrl = "http://soundfxcenter.com/movies/star-wars/8d82b5_Star_Wars_Main_Theme_Song.mp3"

        objectExercise = { ...req.body, fonoId, exampleAudioUrl };

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