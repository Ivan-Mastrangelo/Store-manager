const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  // console.log(products);
  res.status(200).json(products);
};

module.exports = {
  getAll,
};