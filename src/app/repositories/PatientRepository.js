const patient = require('../models/PatientModel');
const PatientModel = require('../models/PatientModel');

exports.list = async data => {

    try {
        var patients = await PatientModel.find({ fonoId: data });

        console.log(Math.floor(
            Math.random() * (3 - 1) + 1
        ));

        patients = await patients.map(element => ({
            ...element._doc, status: Math.floor(
                Math.random() * (3 - 1) + 1
            ) % 2 == 0 ? true : false
        }));


        patients = await patients.map(({ password, username, ...patient }) => {
            return patient;
        });
        return patients;
    } catch (err) {
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