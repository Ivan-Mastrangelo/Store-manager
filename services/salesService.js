const salesModel = require('../models/salesModel');
const updateProductForSales = require('../helpers/updateProductForSales');
const productDeleteSaleUpdate = require('../helpers/productDeleteSaleUpdate');
const productModel = require('../models/productModel');
const UnprocessableEntity = require('../errors/UnprocessableEntity');

const validateSale = async (sales) => {
  const verify = await Promise.all(sales.map(async ({ productId, quantity: saleQuantity }) => {
    const getProduct = await productModel.findById(productId);
    const { quantity: oldQuantity } = getProduct;  
    if (oldQuantity <= 0 || saleQuantity > oldQuantity) {
    return false;
    }
    return true;
  }));

  return verify.every((el) => el === true);
};

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  return sale;
};

const create = async (sales) => {
  const validate = await validateSale(sales);

  if (validate) {
    const newSale = await salesModel.create(sales);
  
    await updateProductForSales(sales);
  
    return newSale;
  }
  if (!validate) throw UnprocessableEntity('Such amount is not permitted to sell');
};

const update = async (saleUp, id) => {
  const [{ quantity }] = saleUp;
  
  if (quantity < 1) throw Error('"quantity" must be greater than or equal to 1');
  
  const getSale = await salesModel.findById(id);
  
  if (!getSale) throw Error('Product not found');

  const validate = await validateSale(saleUp);
  if (!validate) throw UnprocessableEntity('Such amount is not permitted to sell');

  if (validate) {
    await updateProductForSales(saleUp);
    
    const readyUp = await salesModel.update(id, saleUp);
  
    return readyUp;
  }
};

const deleteSale = async (id) => {
  const getSale = await salesModel.findById(id);
  if (!getSale) throw Error('Sale not found');
  await productDeleteSaleUpdate(id);
  await salesModel.deleteSale(id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
  validateSale,
};