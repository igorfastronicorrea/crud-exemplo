'use sctrict';

const express = require('express');
const router = express.Router();

const TrainingController = require('./app/controllers/training/TrainingController');
const FonoController = require('./app/controllers/fono/FonoController')
const AuthFonoController = require('./app/controllers/fono/AuthFonoController')
const AuthPatientController = require('./app/controllers/patient/AuthPatientController')
const PatientController = require('./app/controllers/patient/PatientController')
const TrainingListController = require('./app/controllers/patient/TrainingListController')
const TrainingDetailController = require('./app/controllers/patient/TrainingDetailController')
const ExerciseController = require('./app/controllers/exercise/ExerciseController')
const Monitoring = require('./app/controllers/fono/Monitoring')

router.get('/version', (req, res) => res.status(200).send({ version: "0.0.1" }));


//WEB
router.post('/fono/register', FonoController.post);
router.post('/fono/login', AuthFonoController.post);
router.post('/training', TrainingController.post);
router.get('/training', TrainingController.get);
router.post('/patient', PatientController.post);
router.get('/patients', PatientController.get);
router.get('/patient/:patientId/completedTrainings', TrainingListController.getCompletedTrainings);
router.get('/patient/:patientId/pendingtrainings', TrainingListController.getPendingTrainings);
router.get('/training/:trainingId', TrainingListController.getTrainingDetail);
router.post('/exercise', ExerciseController.postCreateExercise);
router.get('/exercises', ExerciseController.getExercises);
router.get('/exercise/:idExercise', ExerciseController.getExercise);


//MOBILE
router.post('/auth/patient', AuthPatientController.post);
router.get('/patient/:patientId/training', TrainingListController.get);
router.get('/patient/training/:trainingId', TrainingDetailController.get);
router.put('/patient/training/:trainingId', TrainingDetailController.put);




router.post('/monitoring', Monitoring.post)
router.get('/monitoring', TrainingController.get)

module.exports = router;