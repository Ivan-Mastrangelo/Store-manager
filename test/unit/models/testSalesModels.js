const { expect } = require('chai');
const salesModel = require('../../../models/salesModel');
const connection = require('../../../models/connection');
const sinon = require('sinon');

describe('testar se as funções da camada salesModel estão operacionais', () => {
  describe('testar as funções das rotas de consulta', () => {
    const myArray =   [
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
  
    describe('testar se busca todos os produtos cadastrados', () => {
      
      before(() => {
        sinon.stub(connection, 'execute').resolves([myArray]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('retorna um array com todos os produtos', async () => {
        const result = await salesModel.getAll();
  
        expect(result).to.be.an('array');
        expect(result[0]).to.be.an('object');
        expect(result[1]).to.be.an('object');
        expect(result[0]).to.have.property('saleId');
        expect(result[0]).to.have.property('date');
        expect(result[0]).to.be.have.property('productId')
        expect(result[0]).to.have.property('quantity');
        expect(result[1]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      })
    })
  
    describe('Buscar a venda pelo id passado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([myArray]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Testar caso de sucesso', async () => {
        const result = await salesModel.findById(1);
  
        expect(result).to.be.an('array');
        expect(result[0]).to.include.all.keys('saleId', 'date', 'productId', 'quantity');
      });
    });
    describe('Buscar produto pelo id passado', () => {
      before(() => {
        sinon.stub(connection, 'execute').resolves([[]]);
      });
      after(() => {
        connection.execute.restore();
      });
      it('testar em caso de falha', async () => {
        const result = await salesModel.findById(1);
  
        expect(result).to.be.equal(null);
      });
    });
  });
  describe('testar rotas de cadastro e atualização', () => {
    
  })
});