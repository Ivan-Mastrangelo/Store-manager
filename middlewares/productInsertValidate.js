const nameInsert = (req, res, next) => {
  if (!req.body.name) return res.status(400).json({ message: '"name" is required' });
  if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }  
  next();
};

const quantityExist = (req, res, next) => {
  if (req.body.quantity < 1) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

const quantityplus = (req, res, next) => {
  if (!req.body.quantity) return res.status(400).json({ message: '"quantity" is required' });
  next();
};

module.exports = {
  nameInsert,
  quantityExist,
  quantityplus,
};
