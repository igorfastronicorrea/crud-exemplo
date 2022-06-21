const mongoose = require('../database');

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String
    },
    description: {
        type: String
    },
    date: {
        type: Date
    },
    exampleAudioUrl: {
        type: String,
    },
    audioTrainingUrl: {
        type: String,
    },
    audioTrainingBase64: {
        type: String,
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