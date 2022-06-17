const PatientModel = require('../models/PatientModel');

exports.find = async (req) => {

    try{
        
        var user = PatientModel.find({ $and: [{username: req.username}, {password: req.password} ]})

        return user;
    }catch(err){
        return undefined;
    }

}