const repository = require('../../repositories/AuthPatientRepository');

exports.post = async (req, res) => {

    try {
        console.log("chegou aqui")
        var data = await repository.find(req.body);

        if (data != undefined) {
            const newObject = Object.assign({}, {
                'id': data[0]._id,
                'name': data[0].name,
            })

            console.log("teste")
            var firebaseToken = req.body.firebaseToken;
            console.log(firebaseToken)
            await repository.update(data[0]._id, firebaseToken);

            res.status(200).send({ patient: newObject });
        } else {
            res.status(401).send({ "message": "username or password wrong" });
        }

    } catch (err) {
        console.log(err)
        res.status(401).send({ "message": "username or password wrong" });
    }
}