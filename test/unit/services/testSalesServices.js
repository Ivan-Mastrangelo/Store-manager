const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const salesService = require('../../../services/salesService');
const sinon = require('sinon');
const productModel = require('../../../models/productModel');

describe('Verificar se as func. da camada salesService estão operacionais', () => {
  describe('Verificar as requisições de busca ao BD', () => {
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
  });
  describe('Verificar requisições de inserção de dados ao BD', () => {
    const newSale = {
      id: 1,
      itemsSold:  [
          {
            "productId": 1,
            "quantity": 3,
          }
        ]
      }
    describe('Verificar inserção de novas vendas', () => {
      before(() => {
        sinon.stub(productModel, 'update').resolves();
        sinon.stub(productModel, 'findById').resolves(newSale.itemsSold[0]);
        sinon.stub(salesModel, 'create').resolves(newSale);
      });
      after(() => {
        productModel.findById.restore();
        salesModel.create.restore();
        productModel.update.restore();
      });
      it('Testar se as vendar são inseridas com sucesso', async () => {
        const result = await salesService.create(newSale.itemsSold);
    
        expect(result).to.be.a('object');
        expect(result).to.include.all.keys('id', 'itemsSold');
      });
    });
  });
});
