const productIdIn = (req, res, next) => {
    if (!req.body.poductId) return res.status(400).json({ message: '"productId" is required' });
    next();
  };
  
  const quantityExist = (req, res, next) => {
    if (!req.body.quantity) return res.status(400).json({ message: '"quantity" is required' });
    next();
  };

  const quantityplus = (req, res, next) => {
    if (req.body.quantity < 1) {
      return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
    }
    next();
  };
  
  module.exports = {
    productIdIn,
    quantityExist,
    quantityplus,
  };