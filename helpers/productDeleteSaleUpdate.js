const productModel = require('../models/productModel');
const saleModel = require('../models/salesModel');

const productDeleteSaleUpdate = async (id) => {
  const getSale = await saleModel.findById(id);
  await Promise.all(getSale.map(async ({ productId, quantity: saleQuantity }) => {
    const productOld = await productModel.findById(productId);
    const { name, quantity: oldQuantity } = productOld;
    const quantity = oldQuantity + saleQuantity;
    const producUpdated = { id: productId, name, quantity };
    await productModel.update(producUpdated);
  }));
};

module.exports = productDeleteSaleUpdate;
