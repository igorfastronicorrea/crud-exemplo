'use sctrict';

const express = require('express');
const router = express.Router();


const UserController = require("./app/controllers/user/UserController");
const authMiddleware = require('./app/middleware/auth');
const AuthController = require("./app/controllers/auth/AuthController");
const ProdutoController = require("./app/controllers/produto/ProdutoController");

router.get('/version', (req, res) => res.status(200).send({ version: "0.0.1" }));

//MOBILE
router.post('/auth', AuthController.post);
router.post('/user', UserController.post);

router.get('/produto', ProdutoController.get);
router.post('/produto', ProdutoController.post);


module.exports = router;