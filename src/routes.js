'use sctrict';

const express = require('express');
const router = express.Router();


const UserController = require("./app/controllers/user/UserController");
const authMiddleware = require('./app/middleware/auth');
const AuthController = require("./app/controllers/auth/AuthController");

router.get('/version', (req, res) => res.status(200).send({ version: "0.0.1" }));

//MOBILE
router.post('/auth', AuthController.post);
router.post('/user', UserController.post);

module.exports = router;