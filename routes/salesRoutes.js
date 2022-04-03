const express = require('express');

const router = express.Router();
const { productIdIn, quantityExist, quantityplus } = require('../middlewares/salesInsertValidate');

const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

router.get('/:id', salesController.findById);

router.post('/', quantityExist, quantityplus, productIdIn, salesController.create);

router.put('/', quantityExist, quantityplus, productIdIn, salesController.update);

module.exports = router;
