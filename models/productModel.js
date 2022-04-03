const connection = require('./connection');

const getAll = async () => {
  const [products] = await connection.execute(
    'SELECT id, name, quantity FROM StoreManager.products ORDER BY id;',
  );
  
  return products;
};

const findById = async (id) => {
  const query = 'SELECT * FROM StoreManager.products WHERE id = ?';

  const [product] = await connection.execute(query, [id]);

  // if (product.length === 0) return null;

  return product[0];
};

const create = async ({ name, quantity }) => {
  const [result] = await connection.execute(
    `INSERT INTO StoreManager.products 
    (name, quantity) VALUES (?, ?);`,
    [name, quantity],
  );

  return {
    id: result.insertId,
    name,
    quantity,  
  };
};

const update = async ({ id, name, quantity }) => {
  await connection.execute(
    `UPDATE StoreManager.products SET 
      name = ?, quantity = ? WHERE id = ?;`,
      [name, quantity, id],
  );
  return {
      id,
      name,
      quantity,
  };
};

module.exports = {
  getAll,
  findById,
  create,
  update,
};