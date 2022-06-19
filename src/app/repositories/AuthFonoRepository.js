const FonoModel = require('../models/FonoModel');

exports.find = async (req) => {

    try {

        var user = await FonoModel.findOne({ username: req.username }).select('+password');

        return user;
    } catch (err) {
        console.log(err)
        return undefined;
    }

}