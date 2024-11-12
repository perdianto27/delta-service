const express = require('express');
const Router = express.Router();

const { verifyBasic  } = require('../middleware/auth/basic-auth');
const product = require('../controller/ProductController');
const { validator  } = require('../middleware/validator');
const { postProductValidation, putProductValidation, validateId  } = require('../middleware/validator/schema/ProductValidation');

Router.post('/', verifyBasic(), validator(postProductValidation), product.postProduct);
Router.get('/', verifyBasic(), product.getProduct);
Router.get("/:id", verifyBasic(), validator(validateId, "params"), product.getProductById);
Router.put("/:id", verifyBasic(), validator(putProductValidation), validator(validateId, "params"), product.updateProductById);
Router.delete('/:id', verifyBasic(), validator(validateId, "params"), product.deleteProductById);

module.exports = Router;