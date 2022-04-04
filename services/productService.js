const productModel = require('../models/productModel');
const helper = require('../helpers/createValidate');

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
  const check = await helper.createValidate(name);

  if (check === false) throw Error('Product already exists');

  const newProduct = await productModel.create({ name, quantity });
                                       
  return newProduct;
};

const update = async (product) => {
  const { id, name, quantity } = product;
  
  const getProduct = await productModel.findById(id);
   
  if (!getProduct) throw Error('Product not found');

  const readyUp = await productModel.update({ id, name, quantity });

  return readyUp;
};

const deleteProduct = async (id) => {
  const getProduct = await productModel.findById(id);

  if (!getProduct) throw Error('Product not found');

  await productModel.deleteProduct(getProduct.id);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteProduct,
};