const mongoose = require('../database');

const TrainingSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    exampleAudio: {
        type: String
    },
    exampleAudioBase64: {
        type: String
    },
    trainingAudio: {
        type: String,
    },
    trainingAudioBase64: {
        type: String,
    },
    date: {
        type: Date
    },
    complete: {
        type: Boolean
    },
    fonoId: {
        type: String
    },
    patientId: {
        type: String
    }
},
    {
        versionKey: false
    }
)


const training = mongoose.model('training', TrainingSchema, 'training');

module.exports = training;