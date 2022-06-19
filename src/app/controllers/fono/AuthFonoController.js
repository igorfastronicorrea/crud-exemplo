const Fono = require('../../models/FonoModel');
const repository = require('../../repositories/AuthFonoRepository');
const authService = require('../../services/authService');
const bcryptjs = require('bcryptjs');

exports.post = async (req, res) => {

    try {
        var data = await repository.find(req.body);

        if (!data) {
            return res.status(500).send({ "message": "username or password wrong" });
        }

        if (!await bcryptjs.compare(req.body.password, data.password)) {
            return res.status(500).send({ "message": "username or password wrong" });
        }
        const token = await authService.generateToken({ id: data._id, username: data.username, email: data.email });

        if (data != undefined) {
            const newObject = Object.assign({}, {
                'name': data.name,
                'email': data.email,
                'token': token,
            })

            data.password = undefined;

            return res.status(200).send(newObject);
        } else {
            return res.status(500).send({ "message": "username or password wrong" });
        }

    } catch (err) {
        console.log(err)
        return res.status(500).send({ "message": "username or password wrong" });
    }
}