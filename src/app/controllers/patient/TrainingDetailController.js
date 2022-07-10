const repository = require('../../repositories/TrainingRepository.js');
const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();
var path = require('path');
var path = require('path');
const AWS = require('aws-sdk');
const mime = require('mime');

exports.get = async (req, res) => {

    try {
        var training = await repository.detailTrainingOfPatient(req.params.trainingId);
        res.status(200).send({ training })
    } catch (err) {
        res.status(500).send({ "message": "error load training detail" });
    }
}

exports.put = async (req, res) => {
    try {
        let audioTrainingUrl = `https://mobot-audios.s3.us-west-2.amazonaws.com/${req.params.trainingId}-training.mp3`;
        let base64String = req.body.audioTrainingBase64

        var trainingId = req.params.trainingId;

        var training = await repository.completeTrainingOfPatient(req.params.trainingId, req.body.audioTrainingBase64, audioTrainingUrl);


        fs.writeFile(`trainings/${req.params.trainingId}-training.aac`, base64String, { encoding: 'base64' }, async function (err) {
            var pathToSourceFile = path.resolve(__dirname, `../../../../trainings/${req.params.trainingId}-training.aac`);
            var pathToSourceOutFile = path.resolve(__dirname, `../../../../trainings/${req.params.trainingId}-training.mp3`);
            command = ffmpeg(pathToSourceFile).output(pathToSourceOutFile).audioCodec('libmp3lame').run();

            console.log('File mp3 created');
        });


        setTimeout(async function () {
            var pathToSourceOutFile = path.resolve(__dirname, `../../../../trainings/${req.params.trainingId}-training.mp3`);

            const fileContent = await fs.promises.readFile(pathToSourceOutFile);
            const contentType = mime.getType(pathToSourceOutFile);
            console.log(trainingId)
            const s3 = new AWS.S3();
            await s3.putObject({
                Body: fileContent,
                Key: trainingId + "-training.mp3",
                Bucket: "mobot-audios",
                ContentType: contentType,
                ACL: 'public-read',
            }).promise();
        }, 12000);


        setTimeout(function () {
            //removendo aac
            fs.unlink(`trainings/${req.params.trainingId}-training.aac`, function (err) {
                if (err) {
                    console.log('error create exercise')
                } else {
                    console.log('File deleted!');
                };

            });

            //removendo mp3
            fs.unlink(`trainings/${req.params.trainingId}-training.mp3`, function (err) {
                if (err) {
                    console.log('error create exercise')
                } else {
                    console.log('File deleted!');
                };

            });
        }, 50000);

        res.status(200).send({ training })
    } catch (err) {
        res.status(500).send({ "message": "error put training detail" });
    }
}

exports.convert = async (req, res) => {

    try {

        //Necessary installed http://www.ffmpeg.org/download.html
        console.log(__dirname, '../../../public/converter.aac')
        var pathToSourceFile = path.resolve(__dirname, '../s../../../public/converter.aac');
        var pathToSourceOutFile = path.resolve(__dirname, '../../../../public/out.mp3');
        var readStream = fs.createReadStream(pathToSourceFile);
        var writeStream = fs.createWriteStream('./output.mp3');
        command = await ffmpeg(pathToSourceFile)
            .output(pathToSourceOutFile).audioCodec('libmp3lame').run();
        console.log(command);
    } catch (e) {
        console.log(e);
    }

}