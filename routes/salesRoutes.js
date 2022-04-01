const express = require('express');

const router = express.Router();
const { poductIdInsert, quantityProductsIn } = require('../middlewares/salesInsertValidate');

const salesController = require('../controllers/salesController');

router.get('/', salesController.getAll);

router.get('/:id', salesController.findById);

module.exports = router;
