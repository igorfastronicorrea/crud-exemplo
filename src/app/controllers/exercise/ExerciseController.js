const repository = require('../../repositories/ExerciseRepository');
const decodeToken = require('../../services/decodedService');
const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();
var path = require('path');
const AWS = require('aws-sdk');
const mime = require('mime');

exports.postCreateExercise = async (req, res) => {

    try {
        var fonoId = await decodeToken.decodeId(req.headers.authorization);

        let base64String = req.body.exampleAudioBase64

        var exampleAudioUrl = "https://api-mobot.herokuapp.com/";

        objectExercise = { ...req.body, fonoId, exampleAudioUrl };

        var data = await repository.create(objectExercise);
        const idExercise = data._id;

        fs.writeFile(`exercises/${data._id}-exercise.mp3`, base64String.replace("data:audio/mp3;base64,", ""), { encoding: 'base64' }, async function (err) {
            console.log('File mp3 created');

            var pathToSourceFile = path.resolve(__dirname, `../../../../exercises/${idExercise}-exercise.mp3`);
            const fileContent = await fs.promises.readFile(pathToSourceFile);
            const contentType = mime.getType(pathToSourceFile);
            console.log(idExercise)
            const s3 = new AWS.S3();
            await s3.putObject({
                Body: fileContent,
                Key: idExercise + "-exercise.mp3",
                Bucket: "mobot-audios",
                ContentType: contentType,
                ACL: 'public-read',
            }).promise();

            fs.unlink(`exercises/${data._id}-exercise.mp3`, function (err) {
                if (err) {
                    console.log('error create exercise')
                } else {
                    console.log('File deleted!');
                };

            });
        });


        exampleAudioUrl = `https://mobot-audios.s3.us-west-2.amazonaws.com/${idExercise}-exercise.mp3`;

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