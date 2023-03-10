const UserModel = require('../models/UserModel');

exports.find = async (req) => {

    try {

        var user = await UserModel.findOne({ username: req.username }).select('+password');

        return user;
    } catch (err) {
        console.log(err)
        return undefined;
    }

}