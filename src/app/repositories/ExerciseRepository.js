const ExerciseModel = require('../models/ExerciseModel');


exports.list = async data => {

    try {

        let listExerciseOfFono = await ExerciseModel.find({ fonoId: data })

        if (listExerciseOfFono.length > 0) {
            return listExerciseOfFono;
        } else {
            return undefined;
        }

    } catch (err) {
        return undefined;
    }

}

exports.create = async data => {

    try {
        let exercise = await ExerciseModel.create(data);

        return exercise;
    } catch (err) {
        return undefined;
    }

}

exports.detail = async data => {
    try {
        let exercise = await ExerciseModel.find({ _id: data });
        return exercise[0];
    } catch (err) {
        return undefined;
    }
}