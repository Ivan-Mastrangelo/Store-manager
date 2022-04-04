const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const sales = await salesService.getAll();

  res.status(200).json(sales);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const sale = await salesService.findById(id);

  if (!sale) return res.status(404).json({ message: 'Sale not found' });

  res.status(200).json(sale);
};

const create = async (req, res) => {
  try {
    // const { productId, quantity } = req.body;
    const newSale = await salesService.create(req.body);
    return res.status(201).json(newSale);
  } catch (error) {
    return res.status(400).json({ message: 'Bad request' });
  }
};

const update = async (req, res) => {
  try {
    const { id } = req.params;

    const readyUp = await salesService.update(req.body, id);

    return res.status(200).json(readyUp);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};

const deleteSale = async (req, res) => {
  console.log(req.params);
 
  try {
    const { id } = req.params;
    console.log(typeof id);
    await salesService.deleteSale(id);

    return res.status(204).end();
  } catch (error) {
    return res.status(404).json({ message: error.message });
  }
};

module.exports = {
  getAll,
  findById,
  create,
  update,
  deleteSale,
};