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
const authMiddleware = require('./app/middleware/auth');

router.get('/version', (req, res) => res.status(200).send({ version: "0.0.1" }));


//WEB
router.post('/fono/register', FonoController.post);
router.post('/fono/login', AuthFonoController.post);
router.post('/training', authMiddleware, TrainingController.post);
router.get('/training', authMiddleware, TrainingController.get);
router.delete('/training/:trainingId', authMiddleware, TrainingListController.deleteTraining);
router.post('/patient', authMiddleware, PatientController.post);
router.get('/patients', authMiddleware, PatientController.get);
router.get('/patient/:patientId/completedTrainings', authMiddleware, TrainingListController.getCompletedTrainings);
router.get('/patient/:patientId/pendingtrainings', authMiddleware, TrainingListController.getPendingTrainings);
router.get('/training/:trainingId', authMiddleware, TrainingListController.getTrainingDetail);
router.post('/exercise', authMiddleware, ExerciseController.postCreateExercise);
router.get('/exercises', authMiddleware, ExerciseController.getExercises);
router.get('/exercise/:idExercise', authMiddleware, ExerciseController.getExercise);


//MOBILE
router.post('/auth/patient', AuthPatientController.post);
router.get('/patient/:patientId/training', TrainingListController.get);
router.get('/patient/training/:trainingId', TrainingDetailController.get);
router.put('/patient/training/:trainingId', TrainingDetailController.put);


router.post('/monitoring', Monitoring.post)
router.get('/monitoring', TrainingController.get)

router.get('/audioconverter', TrainingDetailController.convert);


module.exports = router;