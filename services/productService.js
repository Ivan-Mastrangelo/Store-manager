const productModel = require('../models/productModel');
const { createValid } = require('../helpers/createValidate');

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
  const check = await createValid(name);
  if (check === false) throw Error('Product already exists');

  const newProduct = await productModel.create({ name, quantity });
                                       
  return newProduct;
};

module.exports = {
  getAll,
  findById,
  create,  
};