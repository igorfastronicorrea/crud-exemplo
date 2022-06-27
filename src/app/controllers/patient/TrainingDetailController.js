const repository = require('../../repositories/TrainingRepository.js');
const fs = require('fs');
var ffmpeg = require('fluent-ffmpeg');
var command = ffmpeg();
var path = require('path');

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
        var training = await repository.completeTrainingOfPatient(req.params.trainingId, req.body.trainingAudio);

        let base64String = req.body.trainingAudio

        fs.writeFile(`public/${req.params.trainingId}-training.mp3`, base64String, { encoding: 'base64' }, function (err) {
            console.log('File mp3 created');
        });

        res.status(200).send({ training })
    } catch (err) {
        res.status(500).send({ "message": "error put training detail" });
    }
}

exports.convert = async (req, res) => {

    try {

        console.log(__dirname, '../../../public/converter.aac')
        var pathToSourceFile = path.resolve(__dirname, '../../../../public/converter.aac');
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