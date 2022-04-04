const express = require('express');

const router = express.Router();
// const { productIdIn, quantityExist, quantityplus } = require('../middlewares/salesInsertValidate');

const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

router.get('/:id', salesController.findById);

router.post('/', salesController.create);

router.put('/:id', productIdIn, quantityExist, quantityplus, salesController.update);

module.exports = router;
