const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  return sale;
};

const create = async (sales) => {
  const newSale = await salesModel.create(sales);

  return newSale;
};

module.exports = {
  getAll,
  findById,
  create,
};