const express = require('express');
const Router = express.Router();

const auth = require('../controller/AuthController');
const { verifyBasic  } = require('../middleware/auth/basic-auth');

Router.post('/login', auth.postLogin);
Router.get('/secure', verifyBasic(), auth.getSecure);

module.exports = Router;