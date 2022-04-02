const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const connection = require('../../../models/connection');
const sinon = require('sinon');
const req = require('express/lib/request');

describe('testar se as funções da camada productModels estão operacionais', () => {
  describe('testar as funções das rotas de consulta', () => {
    const myArray =  [
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
        sinon.stub(connection, 'execute').resolves([myArray]);
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
        sinon.stub(connection, 'execute').resolves([myArray]);
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
  describe('testar rotas de cadastro e atualização', () => {

    const theProduct = {
      name: 'produto',
      quantity: 10,
    };

    describe('testar a camada productModel ao serir um novo produto no BD com sucesso', () => {
      before(() => {
        const newId = [{ insertId: 1 }];
        sinon.stub(connection, 'execute').resolves(newId);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Verifica se o retorno é de um objeto como o esperado', async () => {
        const result = await productModel.create(theProduct);
  
        expect(result).to.be.a('object')
      });
  
      it('Verifica se o id foi inserido e as demais chaves no novo objeto', async () => {
        const result = await productModel.create(theProduct);
  
        expect(result).to.include.all.keys('id', 'name', 'quantity');
      });
    });
    describe('testar a camada productModel ao Atualizar um produto no BD com sucesso', () => {
      const prodUpdate = {
        id: 1,
        name: 'produto',
        quantity: 9,
      }

      before(() => {
        sinon.stub(connection, 'execute').resolves(prodUpdate);
      });
      after(() => {
        connection.execute.restore();
      });
      it('Verificar se o valor foi inserido', async () => {
        const result = await productModel.update(prodUpdate);
        console.log(result);
        expect(result).to.be.a('object');
        expect(result).to.include.all.keys('id', 'name', 'quantity');
        expect(result.id).to.be.equal(prodUpdate.id);
        expect(result.name).to.be.equal(prodUpdate.name);
        expect(result.quantity).to.be.equal(prodUpdate.quantity);
      })
    })
  });
});
