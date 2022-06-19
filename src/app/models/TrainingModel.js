const mongoose = require('../database');

const TrainingSchema = new mongoose.Schema({
    date: {
        type: Date
    },
    complete: {
        type: Boolean,
        default: false,
    },
    fonoId: {
        type: String
    },
    patientId: {
        type: String
    },
    exerciseId: {
        type: String
    }
},
    {
        versionKey: false
    }
)


const training = mongoose.model('training', TrainingSchema, 'training');

module.exports = training;