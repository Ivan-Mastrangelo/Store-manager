const nameInsert = (req, res, next) => {
  // const { name, quantity } = req.body;
  if (!req.body.name) return res.status(400).json({ message: '"name" is required' });
  if (req.body.name.length < 5) {
    return res.status(422).json({ message: '"name" length must be at least 5 characters long' });
  }  
  next();
};

const quantityInsert = (req, res, next) => {
  if (!req.body.quantity) return res.status(400).json({ message: '"quantity" is required' });
  if (req.body.quantity <= 0) {
    return res.status(422).json({ message: '"quantity" must be greater than or equal to 1' });
  }
  next();
};

module.exports = {
  nameInsert,
  quantityInsert,
};
