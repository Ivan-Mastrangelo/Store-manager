const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const sinon = require('sinon');
const { boolean } = require('joi');
const createValidate = require('../../../helpers/createValidate');
const connection = require('../../../models/connection');

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
    // describe('Testar casos de erro de validação ao inserir nov produto', () => {
    //   const oldProduct = {
    //     id: 1,
    //     name: "Martelo de Thor",
    //     quantity: 10
    //   }
    //   before(() => {
    //     sinon.stub(productModel, 'findById').resolves(true);
    //   });
    //   after(() => {
    //     productModel.findById.restore();
    //   });
    //   it('Testar se retorna mensagem de erro', async () => {
    //     const result = await productService.create(oldProduct);
    //     console.log(result);
    //     expect(result).to.be.equal({ message: 'Product already exists'});
    //   });
    // });
    describe('Testar a camada productService ao atualizar produto com sucesso', () => {
      const prodUpdate = {
        id: 1,
        name: 'produto',
        quantity: 9,
      }
      before(() => {
        sinon.stub(productModel, 'update').resolves(prodUpdate);
        sinon.stub(productModel, 'findById').resolves(prodUpdate);
        
      });
      after(() => {
        productModel.findById.restore();
        productModel.update.restore();
      });
      it('Verificar se o objeto retorna com as atualizações', async () => {
        const result = await productService.update(prodUpdate);

        expect(result).to.be.a('object');
        expect(result.id).to.be.equal(prodUpdate.id);
        expect(result.name).to.be.equal(prodUpdate.name);
        expect(result.quantity).to.be.equal(prodUpdate.quantity);
      });
    });
  });
  describe('Testar rota de exclusão de produtos', () => {
    const oldProduct = {
      id: 1,
      name: 'Martelo do Thor',
      quantity: 10,
    }
    describe('Testar quando há produto para exclusão na base dados', () => {
      before(() => {
        sinon.stub(productModel, 'findById').resolves(oldProduct);
        sinon.stub(productModel, 'deleteProduct').resolves(oldProduct);
      });
      after(() => {
        productModel.findById.restore();
        productModel.deleteProduct.restore();
      });
      it('Verificar se produto foi excluído', async () => {
        const result = await productService.deleteProduct(oldProduct);
        console.log(result);
        expect(result).to.be.equal(undefined);
      })
    })
  })
});