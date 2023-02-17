import * as http from 'node-mocks-http';
import { Test } from '@nestjs/testing';
import { CreateCustomerController } from '../../../src/@core/controller/create-customer.controller';
import { CreateCustomerApplication } from '../../../src/@core/applications/create-customer.application';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

const customer: Customer = {
  id: 'any_id',
  name: 'any_name',
  document: 41233439880,
};

const createdResponse: HttpResponse = {
  statusCode: 201,
  body: customer,
};

class MockedCreateCustomerApplication {
  create = jest.fn().mockResolvedValue(createdResponse);
}

describe('CreateCustomerController', () => {
  let controller: CreateCustomerController;
  let application: CreateCustomerApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [CreateCustomerController],
      providers: [
        {
          provide: CreateCustomerApplication,
          useClass: MockedCreateCustomerApplication,
        },
      ],
    }).compile();

    controller = module.get<CreateCustomerController>(CreateCustomerController);
    application = module.get(CreateCustomerApplication);
  });

  describe('create method', () => {
    it('should create a new customer', async () => {
      const httpResponse = http.createResponse();
      jest.spyOn(application, 'create');
      const sut = await controller.create(customer, httpResponse);
      expect(sut.statusCode).toEqual(createdResponse.statusCode);
      expect(application.create).toBeCalled();
    });
  });
});
