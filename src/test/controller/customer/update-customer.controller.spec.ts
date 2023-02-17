import * as http from 'node-mocks-http';
import { Test } from '@nestjs/testing';
import { UpdateCustomerController } from '../../../src/@core/controller/update-customer.controller';
import { UpdateCustomerApplication } from '../../../src/@core/applications/update-customer.application';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

const customer: Customer = {
  id: 'any_id',
  name: 'any_name',
  document: 41233439880,
};

const updateResponse: HttpResponse = {
  statusCode: 200,
  body: customer,
};

class MockedUpdateCustomerApplication {
  update = jest.fn().mockResolvedValue(updateResponse);
}

describe('UpdateCustomerController', () => {
  let controller: UpdateCustomerController;
  let application: UpdateCustomerApplication;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      controllers: [UpdateCustomerController],
      providers: [
        {
          provide: UpdateCustomerApplication,
          useClass: MockedUpdateCustomerApplication,
        },
      ],
    }).compile();

    controller = module.get<UpdateCustomerController>(UpdateCustomerController);
    application = module.get(UpdateCustomerApplication);
  });

  describe('update method', () => {
    it('should update customer by id', async () => {
      const httpResponse = http.createResponse();
      jest.spyOn(application, 'update');
      const sut = await controller.update(customer.id!, customer, httpResponse);
      expect(sut.statusCode).toEqual(updateResponse.statusCode);
      expect(application.update).toBeCalled();
    });
  });
});
