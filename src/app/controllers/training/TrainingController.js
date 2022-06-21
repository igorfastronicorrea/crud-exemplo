const User = require('../../models/TrainingModel');
const repository = require('../../repositories/TrainingRepository');
const decodeToken = require('../../services/decodedService');
const exerciseRepository = require('../../repositories/ExerciseRepository');

exports.post = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        var exerciseDetail = await exerciseRepository.detail(req.body.exerciseId);
        var exampleAudioUrl = exerciseDetail.exampleAudioUrl;
        objectTraining = { ...req.body, fonoId, exampleAudioUrl };

        var data = await repository.create(objectTraining);
        res.status(200).send({ data });
    } catch (err) {
        console.log(err)
        res.status(500).send({ "message": "error create training" });
    }
}

exports.get = async (req, res) => {

    try {
        var data = await repository.list();
        res.status(200).send({ monitoring: data });
    } catch (err) {
        res.status(500).send({ "message": "erro" });
    }
}