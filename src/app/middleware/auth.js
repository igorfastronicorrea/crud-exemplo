'use strict';

const jwt = require('jsonwebtoken');
const authConfig = require('../config/auth.json');

// eslint-disable-next-line
module.exports = (req, res, next) => {

    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).send({ message: 'No token provide' });
    }

    const parts = authHeader.split(' ');

    if (!parts.length === 2) {
        return res.status(401).send({ message: 'Token error' });
    }

    const [scheme, token] = parts;

    if (!/^Bearer$/i.test(scheme)) {
        return res.status(401).send({ message: 'Token malformatted' });
    }

    jwt.verify(token, authConfig.secret, (err, decoded) => {
        if (err) {
            return res.status(401).send({ message: 'Invalid Token ' });
        }

        req.fonoId = decoded._id;
        return next();
    });
};
