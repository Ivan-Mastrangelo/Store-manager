const productModel = require('../models/productModel');

const updateProductForSales = async (saleUp) => {
  await Promise.all(saleUp.map(async ({ productId, quantity: saleQuantity }) => {
    const productOld = await productModel.findById(productId);
    let quantity;
    const { name, quantity: oldQuantity } = productOld;
    if (oldQuantity < saleQuantity) {
    quantity = oldQuantity + saleQuantity;
    } else {
      quantity = oldQuantity - saleQuantity;
    }
    const producUpdated = { id: productId, name, quantity };
    await productModel.update(producUpdated);
  }));
};

module.exports = updateProductForSales;
// Lógica desenvolvida em conjunto com o monitor Vinicius dionysio, da mentoria summer.