const mongoose = require('../database');

const ExerciseSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    description: {
        type: String
    },
    exampleAudioUrl: {
        type: String
    },
    exampleAudioBase64: {
        type: String
    },
    fonoId: {
        type: String,
        require: true
    }
},
    {
        versionKey: false
    }
)

const exercise = mongoose.model('exercise', ExerciseSchema, 'exercise');

module.exports = exercise;