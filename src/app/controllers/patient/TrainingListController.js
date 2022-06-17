const repository = require('../../repositories/TrainingRepository');

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
        console.log(req.params)
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
        res.status(200).send({ trainingDetail });
    } catch (err) {
        res.status(500).send({ "message": " error load training detail this patient" });
    }
}