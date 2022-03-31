const productModel = require('../models/productModel');

const getAll = async () => {
  const products = await productModel.getAll();

  return products;
};

const findById = async (id) => {
  const product = await productModel.findById(id);

  // if (!product) return null;

  return product;
};

module.exports = {
  getAll,
  findById,   
};