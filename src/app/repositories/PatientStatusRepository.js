const TrainingModel = require('../models/TrainingModel');

exports.statusPacientXExercise = async patientID => {
    try {
        var status = await TrainingModel.find({ patientId: patientID, complete: false })
        if (status.length > 0) {
            return false;
        } else {
            return true;
        }

    } catch (err) {
        console.log(err);
        return false;
    }
}