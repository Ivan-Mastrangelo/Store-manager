const { expect } = require('chai');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const sinon = require('sinon');
const { request } = require('express');

describe('verifica se as func. da camada controller estão operacionais', () => {
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
  
    const request = {};
    const response = {};
  
    describe('testar função getAll', () => {
      before(() => {
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'getAll').resolves(myArray);
      });
      after(() => {
        productService.getAll.restore();
      });
      it('retorna o status 200 e o array de produtos', async () => {
        await productController.getAll(request, response);
        
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(myArray)).to.be.equal(true);
      })
    })
  
    describe('Testar função findById, em caso de sucesso', () =>  {
      before(() => {
        request.params = { id: 1 };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'findById').resolves(myArray[0]);
      });
      after(() => {
        productService.findById.restore();
      });
      
      it('Retornar o status 200 e o produto requerido', async () => {
        await productController.findById(request, response);
        
        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(myArray[0])).to.be.equal(true);
      })
    })
  
    describe('Testar finById em caso de falha', () => {
      before(() => {
        request.params = {};
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'findById').resolves(false);
      });
      after(() => {
        productService.findById.restore();
      });
      it('Deve retornar status 404', async () => {
        await productController.findById(request, response);
  
        expect(response.status.calledWith(404)).to.be.equal(true);
        
      })
      it('Deve retornar mensagem de erro', async () => {
        await productController.findById(request, response);
  
        expect(response.json.calledWith({ message: 'Product not found' })).to.be.true;
      });
    });
  });
  describe('testar rotas de cadastro e atualização', () => {

    describe('Testar a função create ao inserir um novo produto com sucesso', () => {
      const teste = {
        id: 1,
        name: 'produto',
        quantity: 10,
      };
      const response = {};
      const request = {};

      before(() => {
        request.body = {
          id: 1,
          name: 'produto',
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').resolves(teste);
      });
      after(() => {
        productService.create.restore();
      });

      it('Retornar o status 201 e o json do produto requerido', async () => {
          await productController.create(request, response);
          
          expect(response.status.calledWith(201)).to.be.equal(true);
          expect(response.json.calledWith(teste)).to.be.equal(true);
      });
    });
  });
});
