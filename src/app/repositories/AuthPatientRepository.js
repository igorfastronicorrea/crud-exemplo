const PatientModel = require('../models/PatientModel');

exports.find = async (req) => {

    try {
        var user = PatientModel.find({ $and: [{ username: req.username }, { password: req.password }] })

        return user;
    } catch (err) {
        return undefined;
    }

}


exports.update = async (patientId, firebaseToken) => {
    try {

        const query = { _id: patientId };
        const update = { firebaseToken: firebaseToken };

        var updatePatient = await PatientModel.findOneAndUpdate(query, update);

        return updatePatient;
    } catch (err) {
        return undefined;
    }
}