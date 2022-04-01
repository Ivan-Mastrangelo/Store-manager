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

const create = async ({ name, quantity }) => {
  const newProduct = await productModel.create({ name, quantity });
                                      
  return newProduct;
};

module.exports = {
  getAll,
  findById,
  create,  
};