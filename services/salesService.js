const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  return sale;
};

const create = async ({ productId, quantity }) => {
  const newSale = await salesModel.create({ productId, quantity });
  return newSale;
};

const update = async (sale) => {
  const { id, productId, quantity } = sale;

  if (quantity < 1) throw Error('"quantity" must be greater than or equal to 1');
  
  const getSale = await salesModel.findById(id);
 
  if (!getSale) throw Error('Product not found');

  const readyUp = await salesModel.update({ id, productId, quantity });

  return readyUp;
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};