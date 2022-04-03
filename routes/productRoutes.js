const express = require('express');

const router = express.Router();
const { nameInsert, quantityExist, quantityplus } = require('../middlewares/productInsertValidate');

const productController = require('../controllers/productController');

router.get('/', productController.getAll);

router.get('/:id', productController.findById);

router.post('/', nameInsert, quantityExist, quantityplus, productController.create);

router.put('/:id', nameInsert, quantityExist, quantityplus, productController.update);

router.delete('/:id', productController.deleteProduct);

module.exports = router;