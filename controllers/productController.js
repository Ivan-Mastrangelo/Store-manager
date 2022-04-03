const productService = require('../services/productService');

const getAll = async (_req, res) => {
  const products = await productService.getAll();
  res.status(200).json(products);
};

const findById = async (req, res) => {
  const { id } = req.params;

  const product = await productService.findById(id);

  if (!product) return res.status(404).json({ message: 'Product not found' });

  res.status(200).json(product);
};

const create = async (req, res) => {
  try {
    const { name, quantity } = req.body;
    const newProduct = await productService.create({ name, quantity });
  
  return res.status(201).json(newProduct);
  } catch (error) {
    return res.status(409).json({ message: error.message });
  }
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const readyUp = await productService.update({ id, name, quantity });
  return res.status(200).json(readyUp);
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};