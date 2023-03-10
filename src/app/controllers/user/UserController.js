const User = require('../../models/UserModel');
const repository = require('../../repositories/UserRepository');

exports.post = async (req, res) => {

    try {
        var data = await repository.create(req.body);

        if (data != undefined) {
            res.status(200).send({ user: data });
        } else {
            res.status(500).send({ "message": "error create user, username already exist" });
        }

    } catch (err) {
        res.status(500).send({ "message": "erro create user" });
    }
}

exports.get = async (req, res) => {

    try {
        var data = await repository.list();
        res.status(200).send({ user: data });
    } catch (err) {
        res.status(500).send({ "message": "error user list" });
    }
}