const repository = require('../../repositories/PatientRepository');
const serviceAccount = require('../../../firebase/firebasesecret.json');
const firebase = require("firebase-admin");
const AWS = require('aws-sdk');
const mime = require('mime');
const fs = require('fs');
const path = require('path');

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


//AWS_ACCESS_KEY_ID=AKIASVJQ4BYITTXJBQN4
//AWS_SECRET_ACCESS_KEY=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
exports.test = async (req, res) => {

    const pathAudio = "http://localhost:3333/exercises/62c9d278c4eb350016592fff-exercise.mp3";



    var pathToSourceFile = path.resolve(__dirname, `../../../../exercises/62c9d278c4eb350016592fff-exercise.mp3`);

    console.log(pathToSourceFile)

    const fileContent = await fs.promises.readFile(pathToSourceFile);
    console.log(fileContent)

    const contentType = mime.getType(pathToSourceFile);
    console.log(contentType);

    const s3 = new AWS.S3();
    await s3.putObject({
        Body: fileContent,
        Key: "62c9d278c4eb350016592fff21111111111122.mp3",
        Bucket: "mobot-audios",
        ContentType: contentType,
        ACL: 'public-read',
    }).promise();
}