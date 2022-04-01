const { expect } = require('chai');
const salesController = require('../../../controllers/salesController');
const salesService = require('../../../services/salesService');
const sinon = require('sinon');

describe('verifica se as func. da camada salesController estão operacionais', () => {

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

  const request = {};
  const response = {};

  describe('testar função getAll', () => {
    before(() => {
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'getAll').resolves(myObject);
    });
    after(() => {
        salesService.getAll.restore();
    });
    it('retorna o status 200 e o array de produtos', async () => {
      await salesController.getAll(request, response);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(myObject)).to.be.equal(true);
    })
  })

  describe('Testar função findById', () =>  {
    before(() => {
      request.params = { id: 1 };
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'findById').resolves(myObject[0]);
    });
    after(() => {
        salesService.findById.restore();
    });
    it('retorna o status 200 e os dados da venda ', async () => {
      await salesController.findById(request, response);
      
      expect(response.status.calledWith(200)).to.be.equal(true);
      expect(response.json.calledWith(myObject[0])).to.be.equal(true);
    });
  });
  describe('Testar finById em caso de falha', () => {
    before(() => {
      request.params = {};
      response.status = sinon.stub().returns(response);
      response.json = sinon.stub().returns();
      sinon.stub(salesService, 'findById').resolves(false);
    });
    after(() => {
      salesService.findById.restore();
    });
    it('Deve retornar status 404', async () => {
      await salesController.findById(request, response);

      expect(response.status.calledWith(404)).to.be.equal(true);
      
    })
    it('Deve retornar mensagem de erro', async () => {
      await salesController.findById(request, response);

      expect(response.json.calledWith({ message: 'Sale not found' })).to.be.true;
    })
  })
});