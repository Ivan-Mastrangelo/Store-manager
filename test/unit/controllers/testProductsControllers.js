const { expect } = require('chai');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const sinon = require('sinon');
const { request } = require('express');
const helper = require('../../../helpers/createValidate');
const productModel = require('../../../models/productModel')

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
    const newProduct = {
      id: 1,
      name: 'produto',
      quantity: 10,
    };
    const response = {};
    const request = {};

    describe('Testar a função create ao inserir um novo produto com sucesso', () => {
      before(() => {
        request.body = {
          id: 1,
          name: 'produto',
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').resolves(newProduct);
      });
      after(() => {
        productService.create.restore();
      });

      it('Retornar o status 201 e o json do produto requerido', async () => {
          await productController.create(request, response);
          
          expect(response.status.calledWith(201)).to.be.equal(true);
          expect(response.json.calledWith(newProduct)).to.be.equal(true);
      });
    });
    describe('Quando o produto já existe', () => {
      before(() => {
        request.body = {
          id: 1,
          name: "Martelo de Thor",
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'create').throws(Error('Product already exists'));
        // sinon.stub(helper, 'createValidate').resolves(false);
      });
      after(() => {
        // helper.createValidate.restore();
        productService.create.restore();
      });
      it('Verificar se retorna o status 409 e a mensagem de erro', async () => {
        await productController.create(request, response);
          
        expect(response.status.calledWith(409)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Product already exists'})).to.be.equal(true);
      })
    })
    describe('Testar atualização do produto em caso de sucesso', () => {
      before(() => {
        request.params = { id: 1 };
        request.body = {
          name: 'produto',
          quantity: 9,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'update').resolves(newProduct);
      });
      after(() => {
        productService.update.restore();
      });
      it('Testar se a atualização retorna status e mensagem esperada.', async () => {
        await productController.update(request, response);

        expect(response.status.calledWith(200)).to.be.equal(true);
        expect(response.json.calledWith(newProduct)).to.be.equal(true);
      });
    });
    describe('Verificar se produto não existir na base', () => {
      before(() => {
        request.params = { id: 5 }
        request.body = {
          name: "Martelo de Thor",
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'update').throws(Error('Product not found'));
      });
      after(() => {
        productService.update.restore();
      });
      it('Testar se retorna com status 404 e mensagem de erro.', async () => {
        await productController.update(request, response);
        // const teste = response.json.lastCall.args[0];
        expect(response.status.calledWith(404)).to.be.equal(true);
         expect(response.json.calledWith({ message: 'Product not found'})).to.be.equal(true);
        // expect(teste.message).to.be.equal('Product not found');
      });
    });
  });
  describe('Testar rota de exclusão de produtos', () => {
    const oldProduct = {
      id: 1,
      name: 'Martelo do Thor',
    }
    const response = {};
    const request = {};
    describe('Testar quando há produto para exclusão na base dados', () => {
      before(() => {
        request.params = { id: 1 }
        request.body = {
          name: "Martelo de Thor",
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'deleteProduct').resolves(oldProduct);
      });
      after(() => {
        productService.deleteProduct.restore();
      });
      it('Verificar se retorna estatus 204', async () => {
        await productController.deleteProduct(request, response);

        expect(response.status.calledWith(204)).to.be.equal(true);
      });
    });
    describe('Verificar resultado quando não há o produto a ser excluído', () => {
      const newProduct = {
        id: 5,
        name: 'produto',
        quantity: 10,
      };
      const response = {};
      const request = {};
      before(() => {
        request.params = { id: 5 }
        request.body = {
          name: "Martelo de Thor",
          quantity: 10,
        };
        response.status = sinon.stub().returns(response);
        response.json = sinon.stub().returns();
        sinon.stub(productService, 'deleteProduct').throws(Error('Product not found'));
      });
      after(() => {
        productService.deleteProduct.restore();
      });
      it('Verificar se retorna estatus 404 e mensagem de erro', async () => {
        await productController.deleteProduct(request, response);

        expect(response.status.calledWith(404)).to.be.equal(true);
        expect(response.json.calledWith({ message: 'Product not found'})).to.be.equal(true);
      });
    });
  });
});

