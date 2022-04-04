const productModel = require('../models/productModel');

const createValidate = async (searchname) => {
  const allProducts = await productModel.getAll();
  const checkName = allProducts.find((product) => product.name === searchname);

  if (checkName === undefined && searchname.length >= 5) return true;
  
  return false;
};

module.exports = { createValidate };
