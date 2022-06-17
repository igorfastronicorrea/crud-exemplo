const Fono = require('../../models/FonoModel');
const repository = require('../../repositories/AuthFonoRepository');

exports.post = async (req, res) => {

    try {
        var data = await repository.find(req.body);

        if (data != undefined) {
            const newObject = Object.assign({}, {
                'id': data[0]._id,
                'name': data[0].name,
                'email': data[0].email,
            })

            res.status(200).send({ fono: newObject });
        } else {
            res.status(500).send({ "message": "username or password wrong" });
        }

    } catch (err) {
        res.status(500).send({ "message": "username or password wrong" });
    }
}