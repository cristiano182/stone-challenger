import { Test } from '@nestjs/testing';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { Customer } from '../../../src/@core/domain/customer-entity';
import { UpdateCustomerApplication } from '../../../src/@core/applications/update-customer.application';
import { UpdateCustomerService } from '../../../src/@core/services/update-customer.service';

const customer: Customer = {
  id: 'any_id',
  name: 'any_name',
  document: 41233439880,
};

const updatedResponse: HttpResponse = {
  statusCode: 200,
  body: customer,
};

class MockedUpdateCustomerService {
  update = jest.fn().mockResolvedValue(updatedResponse);
}

describe('UpdateCustomerApplication', () => {
  let application: UpdateCustomerApplication;
  let service: UpdateCustomerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        UpdateCustomerApplication,
        {
          provide: UpdateCustomerService,
          useClass: MockedUpdateCustomerService,
        },
      ],
    }).compile();

    application = module.get<UpdateCustomerApplication>(
      UpdateCustomerApplication,
    );
    service = module.get(UpdateCustomerService);
  });

  describe('update method', () => {
    it('should update customer by id', async () => {
      const sut = await application.update(customer.id!, customer);
      const updated = sut.body;

      expect(updated.id).not.toBeNull();
      expect(updated.name).toEqual(customer.name);
      expect(updated.document).toEqual(customer.document);
      expect(service.update).toBeCalled();
    });
  });
});
