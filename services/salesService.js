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

const update = async (saleUp, id) => {
  const [{ productId, quantity }] = saleUp;

  if (quantity < 1) throw Error('"quantity" must be greater than or equal to 1');
  
  const getSale = await salesModel.findById(id);
 
  if (!getSale) throw Error('Product not found');

  const readyUp = await salesModel.update(id, productId, quantity);

  return readyUp;
};

// const deleteSale = async (id) => {
//   const getSale = await salesModel.findById(id);
//   console.log(getSale);
//   if (!getSale) throw Error('Sale not found');
  
//   await salesModel.deleteSale(getSale.id);
// };

module.exports = {
  getAll,
  findById,
  create,
  update,
  // deleteSale,
};