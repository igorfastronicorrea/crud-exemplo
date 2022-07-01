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

        fs.writeFile(`public/${req.params.trainingId}-training.aac`, base64String, { encoding: 'base64' }, async function (err) {
            var pathToSourceFile = path.resolve(__dirname, `../../../../public/${req.params.trainingId}-training.aac`);
            var pathToSourceOutFile = path.resolve(__dirname, `../../../../public/${req.params.trainingId}-training.mp3`);
            command = ffmpeg(pathToSourceFile).output(pathToSourceOutFile).audioCodec('libmp3lame').run();

            console.log('File mp3 created');
        });

        setTimeout(function () {
            fs.unlink(`public/${req.params.trainingId}-training.aac`, function (err) {
                if (err) throw err;
                console.log('File deleted!');
            });
        }, 40000);

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