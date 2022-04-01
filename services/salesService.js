const salesModel = require('../models/salesModel');

const getAll = async () => {
  const sales = await salesModel.getAll();

  return sales;
};

const findById = async (id) => {
  const sale = await salesModel.findById(id);

  console.log(sale);
  return sale;
};

module.exports = {
  getAll,
  findById,   
};