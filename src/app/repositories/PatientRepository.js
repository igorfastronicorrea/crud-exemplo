const status = require('../repositories/PatientStatusRepository');
const PatientModel = require('../models/PatientModel');

exports.list = async data => {

    try {
        var patients = await PatientModel.find({ fonoId: data });
        var result = await status.statusPacientXExercise(patients[0]._id);

        patients = await patients.map(element => ({
            ...element._doc, status: true
        }));

        var elements = []
        for (let index = 0; index < patients.length; index++) {
            var patient = patients[index]
            patient.status = await status.statusPacientXExercise(patient._id);

            elements.push(patient)
        }

        elements = await elements.map(({ password, ...patient }) => {
            return patient;
        });
        return elements;
    } catch (err) {
        console.log(err)
        return undefined;
    }

}


exports.create = async data => {

    try {
        let listPatient = await PatientModel.find({ username: data.username })
        if (listPatient.length > 0) {
            return undefined;
        } else {
            let patient = await PatientModel.create(data);
            return patient;
        }

    } catch (err) {
        console.log(err)
        return undefined;
    }

}

exports.statusPacientXExercise = async patientID => {
    try {
        var status = await PatientModel.find({ patientId: patientID, complete: false })

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