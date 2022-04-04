const productIdIn = (req, res, next) => {
  const teste1 = req.body.some((elemento) => elemento.productId === undefined);
  if (teste1) {
      return res.status(400).json({ message: '"productId" is required' });
    }
  next();
};
const quantityExist = (req, res, next) => {
const teste2 = req.body.some((elemento) => elemento.quantity === undefined);
  if (teste2) {
    return res.status(400).json({ message: '"quantity" is required' });
  }
  next();
};

const quantityplus = (req, res, next) => {
const teste = req.body.some((elemento) => elemento.quantity < 1);
  if (teste) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};
  
module.exports = {
  productIdIn,
  quantityExist,
  quantityplus,
};