const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const sinon = require('sinon');

describe('testar se as funções da camada productModels estão operacionais', () => {
  const myObject =  [
    {
      id: 1,
      name: "produto A",
      quantity: 10
    },
    {
      id: 2,
      name: "produto B",
      quantity: 20
    }
  ];

  describe('testar se busca todos os produtos cadastrados', () => {
    
    before(() => {
      sinon.stub(connection, 'execute').resolves([myObject]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('retorna um array com todos os produtos', async () => {
      const result = await productModel.getAll();
      // console.log(result);
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
      expect(result[0]).to.have.property('id');
      expect(result[0]).to.have.property('name');
      expect(result[0]).to.have.property('quantity');

    })
  })

  describe('Buscar produto pelo id passado', () => {
    before(() => {
      sinon.stub(connection, 'execute').resolves([myObject]);
    });
    after(() => {
      connection.execute.restore();
    });
    it('Testar caso de sucesso', async () => {
      const result = await productModel.findById(1);

      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('id', 'name', 'quantity');
    });
  });
});
