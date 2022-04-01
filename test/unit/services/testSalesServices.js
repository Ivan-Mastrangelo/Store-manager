const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const sinon = require('sinon');

describe('verifica se as func. da camada salesService estão operacionais', () => {
  const myObject =  [
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:29.000Z",
      "productId": 1,
      "quantity": 2
    },
    {
      "saleId": 1,
      "date": "2021-09-09T04:54:54.000Z",
      "productId": 2,
      "quantity": 2
    }
  ];

  describe('testar se busca todas as vendas cadastrados', () => {

    before(() => {
      sinon.stub(salesModel, 'getAll').resolves(myObject);
    });
    after(() => {
      salesModel.getAll.restore();
    });
    it('retorna um array com todos os produtos', async () => {
      const result = await salesService.getAll();
      
      expect(result).to.be.an('array');
      expect(result[0]).to.be.an('object');
      expect(result[1]).to.be.an('object');
      expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      expect(result[1]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    })
  })

  describe('Buscar produto pelo id passado', () => {
    before(() => {
      sinon.stub(salesModel, 'findById').resolves(myObject[0]);
    });
    after(() => {
      salesModel.findById.restore();
    });
    it('Testar caso de sucesso', async () => {
      const result = await salesService.findById(1);

      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
    });
  });
  
})