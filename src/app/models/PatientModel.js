const mongoose = require('../database');

const PatientSchema = new mongoose.Schema({
    name: {
        type: String,
        require: true
    },
    whatsapp: {
        type: String
    },
    username: {
        type: String
    },
    password: {
        type: String,
    },
    fonoId: {
        type: String,
    },
    firebaseToken: {
        type: String,
    }
},
    {
        versionKey: false
    }
)

const patient = mongoose.model('patient', PatientSchema, 'patient');

module.exports = patient;