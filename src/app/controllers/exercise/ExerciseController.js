const repository = require('../../repositories/ExerciseRepository');
const decodeToken = require('../../services/decodedService');
const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();
var path = require('path');

exports.postCreateExercise = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        let base64String = req.body.exampleAudioBase64

        var exampleAudioUrl = "https://api.mobot.com.br/";

        objectExercise = { ...req.body, fonoId, exampleAudioUrl };

        var data = await repository.create(objectExercise);

        fs.writeFile(`exercises/${data._id}-exercise.mp3`, base64String.replace("data:audio/mp3;base64,", ""), { encoding: 'base64' }, function (err) {
            console.log('File mp3 created');
        });

        exampleAudioUrl = "https://api.mobot.com.br/" + `exercises/${data._id}-exercise.mp3`;

        await repository.put(data._id, exampleAudioUrl)


        if (data != undefined) {
            res.status(200).send({ exercise: data });
        } else {
            res.status(500).send({ "message": "error create exercise" });
        }

    } catch (err) {
        console.log(err)
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