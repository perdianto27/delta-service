const express = require('express');
const Router = express.Router();

const upload = require('../controller/UploadController');
const { verifyBasic  } = require('../middleware/auth/basic-auth');
const { uploadSingle } = require('../helpers/uploadHelpers');

Router.post('/', uploadSingle(['image/jpeg', 'image/png'], "image"), verifyBasic(), upload.uploadImage);
Router.get('/:filename', verifyBasic(), upload.getFile);

module.exports = Router;