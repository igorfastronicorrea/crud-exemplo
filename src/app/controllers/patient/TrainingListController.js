const repository = require('../../repositories/TrainingRepository');
const exerciseRepository = require('../../repositories/ExerciseRepository');

exports.get = async (req, res) => {

    try {
        var trainings = await repository.listTrainingsOfPatience(req.params.patientId, req.query.date);

        res.status(200).send({ trainings });
    } catch (err) {
        res.status(500).send({ "message": "error load training this patient" });
    }
}

exports.getPendingTrainings = async (req, res) => {
    try {
        var pendingTrainings = await repository.pendingTrainingPatient(req.params.patientId);
        res.status(200).send({ pendingTrainings });
    } catch (err) {
        res.status(500).send({ "message": " error load training pendents this patient" });
    }
}

exports.getCompletedTrainings = async (req, res) => {
    try {
        var completedTrainings = await repository.completedTrainingPatient(req.params.patientId);
        res.status(200).send({ completedTrainings });
    } catch (err) {
        res.status(500).send({ "message": " error load training completed this patient" });
    }
}


exports.getTrainingDetail = async (req, res) => {
    try {
        var trainingDetail = await repository.trainingDetailPatient(req.params.trainingId);

        var exerciseDetail = await exerciseRepository.detail(trainingDetail.exerciseId);
        exerciseDetail._id = undefined;

        var training = { ...trainingDetail._doc, ...exerciseDetail._doc }
        training.id = training._id;
        training._id = undefined
        training.fonoId = undefined;


        res.status(200).send({ training });
    } catch (err) {
        res.status(500).send({ "message": " error load training detail this patient" });
    }
}

exports.deleteTraining = async (req, res) => {
    try {
        var deleteTraining = await repository.trainingDelete(req.params.trainingId);

        if (!deleteTraining) {
            return res.status(500).send({ "message": "error delete training" });
        }

        return res.status(200).send({ "message": "training deleted with success" });
    } catch (err) {
        console.log(err);
        return res.status(500).send({ "message": "error delete training " });
    }
}