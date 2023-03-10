const UserModel = require('../models/UserModel');

exports.list = async () => {

    try {
        let user = await UserModel.find({});

        return user;
    } catch (err) {
        return undefined;
    }

}

exports.find = async data => {

    try {

        let listUser = await UserModel.find({ username: data.username })

        if (listUser.length > 0) {
            return undefined;
        } else {
            return undefined;
        }

    } catch (err) {
        return undefined;
    }

}

exports.create = async data => {

    try {

        let listUser = await UserModel.find({ username: data.username })

        if (listUser.length > 0) {
            return undefined;
        } else {

            let user = await UserModel.create(data);

            return user;
        }

    } catch (err) {
        return undefined;
    }

}