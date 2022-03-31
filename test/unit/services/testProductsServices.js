const { expect } = require('chai');
const productModel = require('../../../models/productModel');
const productService = require('../../../services/productService');
const sinon = require('sinon');

describe('verifica se as func. da service estão operacionais', () => {
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
      sinon.stub(productModel, 'getAll').resolves(myObject);
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
      sinon.stub(productModel, 'findById').resolves(myObject[0]);
    });
    after(() => {
      productModel.findById.restore();
    });
    it('Testar caso de sucesso', async () => {
      const result = await productService.findById(1);
      console.log(result);
      expect(result).to.be.an('object');
      expect(result).to.include.all.keys('id', 'name', 'quantity');
      expect(result.id).to.be.equal(1);
    });
  });
  
})