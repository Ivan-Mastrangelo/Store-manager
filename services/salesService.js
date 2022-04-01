const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  return sale;
};

module.exports = {
  getAll,
  findById,   
};