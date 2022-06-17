const FonoModel = require('../models/FonoModel');

exports.find = async (req) => {

    try {

        var user = FonoModel.find({ $and: [{ username: req.username }, { password: req.password }] })

        return user;
    } catch (err) {
        return undefined;
    }

}