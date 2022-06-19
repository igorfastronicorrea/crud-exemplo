'use strict';

const jwt = require('jsonwebtoken');

const authConfig = require('../config/auth.json');

exports.generateToken = async (params = {}) => jwt.sign(params, authConfig.secret);
