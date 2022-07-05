const repository = require('../../repositories/PatientRepository');
const serviceAccount = require('../../../firebase/firebasesecret.json');
const firebase = require("firebase-admin");

exports.push = async (req, res) => {
    try {
        var patients = await repository.patientsWithStatus();
        console.log(patients);
        var tokensToSendNotification = [];

        for (let index = 0; index < patients.length; index++) {
            if (!patients[index].status) {
                tokensToSendNotification.push(patients[index].firebaseToken);
            }
        }

        console.log(tokensToSendNotification)

        if (tokensToSendNotification.length <= 0) {
            res.status(200).send({ "message": "nenhum token para enviar push notification" });
            return;
        }


        if (!firebase.apps.length) {
            firebase.initializeApp({
                credential: firebase.credential.cert(serviceAccount),
                databaseURL: "https://mobot-app.firebaseio.com"
            });
        }

        const message = {
            notification: {
                title: 'Mobot',
                body: 'Lembre-se que tem exerícios te esperando no APP'
            },
            tokens: tokensToSendNotification
        };

        firebase.messaging().sendMulticast(message)
            .then((response) => {
                console.log('Successfully sent message:', response);
                res.status(200).send({ "message": "success push notification" });
            })
            .catch((error) => {
                console.log('Error sending message:', error);
                res.status(500).send({ "message": "error send push notification" });
            });


    } catch (err) {
        console.log(err)
        res.status(500).send({ "message": "error send push notification" });
    }
}