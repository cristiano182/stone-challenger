import * as http from 'node-mocks-http';
import { Test } from '@nestjs/testing';
import { GetCustomerController } from '../../../src/@core/controller/get-customer.controller';
import { GetCustomerApplication } from '../../../src/@core/applications/get-customer.application';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

const customer: Customer = {
  id: 'any_id',
  name: 'any_name',
  document: 41233439880,
};

const getResponse: HttpResponse = {
  statusCode: 200,
  body: customer,
};

class MockedGetCustomerApplication {
  find = jest.fn().mockResolvedValue(getResponse);
}

describe('GetCustomerController', () => {
  let controller: GetCustomerController;
  let application: GetCustomerApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [GetCustomerController],
      providers: [
        {
          provide: GetCustomerApplication,
          useClass: MockedGetCustomerApplication,
        },
      ],
    }).compile();

    controller = module.get<GetCustomerController>(GetCustomerController);
    application = module.get(GetCustomerApplication);
  });

  describe('find method', () => {
    it('should find customer by id', async () => {
      const httpResponse = http.createResponse();
      jest.spyOn(application, 'find');
      const sut = await controller.find(customer.id!, httpResponse);
      expect(sut.statusCode).toEqual(getResponse.statusCode);
      expect(application.find).toBeCalled();
    });
  });
});
