const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const sinon = require('sinon');
const { boolean } = require('joi');
const createValidate = require('../../../helpers/createValidate');

describe('verifica se as func. da service estão operacionais', () => {
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
        sinon.stub(productModel, 'getAll').resolves(myArray);
      });
      after(() => {
        productModel.getAll.restore();
      });
      it('retorna um array com todos os produtos', async () => {
        const response = await productService.getAll();
        
        expect(response).to.be.an('array');
        expect(response[0]).to.be.an('object');
        expect(response[0]).to.have.property('id');
        expect(response[0]).to.have.property('name');
        expect(response[0]).to.have.property('quantity');
      })
    })
  
    describe('Buscar produto pelo id passado', () => {
      before(() => {
        sinon.stub(productModel, 'findById').resolves(myArray[0]);
      });
      after(() => {
        productModel.findById.restore();
      });
      it('Testar caso de sucesso', async () => {
        const result = await productService.findById(1);
  
        expect(result).to.be.an('object');
        expect(result).to.include.all.keys('id', 'name', 'quantity');
        expect(result.id).to.be.equal(1);
      });
    });
  });
  describe('testar rotas de cadastro e atualização', () => {

    const newProduct = {
      id: 1,
      name: 'produto',
      quantity: 10,
    };
    describe('Testar a camada productService ao inserir um novo produto com sucesso', () => {
      before(() => {
        sinon.stub(productModel, 'create').resolves(newProduct);
      });
      after(() => {
        productModel.create.restore();
      });
      it('Verificar se é criado um objeto com as suas propriedades', async () => {
        const result = await productService.create(newProduct);
    
        expect(result).to.be.a('object');
        expect(result).to.include.all.keys('id', 'name', 'quantity');
      });
    });
    describe('Testar casos de erro de validação ao inserir nov produto', () => {
      const badProduct = {};
      before(() => {
        // sinon.stub(productModel, 'getAll').resolves(newProduct);
        sinon.stub(productModel, 'create').resolves(false);
        sinon.stub(createValidate, 'createValid').resolves(false);
        // sinon.stub(productService, 'create').resolves(Error);
      });
      after(() => {
        // productModel.getAll.restore();
        productModel.create.restore();
        createValidate.createValid.restore();
        // productService.create.restore();
      });
      it('Testar ', async () => {
        const result = await productService.create(newProduct);
        console.log(result);
        expect(result).to.be.equal(false);
      })
      it('Testar se nome inválido na requisição retorna mensagem de erro', async () => {
        const teste = await createValidate.createValid(newProduct.name);
        
      })
    })
  });
});