const express = require('express');

const router = express.Router();
const { nameInsert, quantityInsert } = require('../middlewares/productInsertValidate');

const productController = require('../controllers/productController');

router.get('/', productController.getAll);

router.get('/:id', productController.findById);

router.post('/', nameInsert, quantityInsert, productController.create);

router.put('/:id', nameInsert, quantityInsert, productController.update);

router.delete('/:id', productController.deleteProduct);

module.exports = router;