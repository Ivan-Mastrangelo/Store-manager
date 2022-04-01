const express = require('express');

const router = express.Router();

const productController = require('../controllers/productController');

router.get('/', productController.getAll);

router.get('/:id', productController.findById);

module.exports = router;