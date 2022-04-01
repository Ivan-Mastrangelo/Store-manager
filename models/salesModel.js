const connection = require('./connection');

const serialize = (salesProductData) => ({
    saleId: salesProductData.sale_id,
    productId: salesProductData.product_id,
    quantity: salesProductData.quantity,
    date: salesProductData.date,
  });

const getAll = async () => {
  const query = `
    SELECT sp.sale_id, sp.product_id, sp.quantity, s.date
    FROM StoreManager.sales_products AS sp
    INNER JOIN StoreManager.sales AS s
    ON s.id = sp.sale_id
    ORDER BY sp.sale_id, sp.product_id;`;

  const [sales] = await connection.execute(query);

  return sales.map(serialize);
};

const findById = async (id) => {
  const query = `
  SELECT sp.product_id, sp.quantity, s.date
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON s.id = sp.sale_id
  WHERE s.id = ?;`;

  const [sale] = await connection.execute(query, [id]);

  if (sale.length === 0) return null;

  return sale.map(serialize);
};

module.exports = {
  getAll,
  findById,
};