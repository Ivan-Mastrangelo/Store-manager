const { expect } = require('chai');
const productController = require('../../../controllers/productController');
const productService = require('../../../services/productService');
const sinon = require('sinon');

describe('verifica se a func. da controller retorna o status e o json', () => {
  describe('Operação realizada com sucesso', () => {
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

    const request = {};
    const response = {};

    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(productService, 'getAll').resolves(myObject);
    });
    after(() => {
      productService.getAll.restore();
    });
    it('retorna o status 200 e o array de produtos', async () => {
      await productController.getAll(request, response);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(myObject)).to.be.equal(true);
    })
  })
  
})