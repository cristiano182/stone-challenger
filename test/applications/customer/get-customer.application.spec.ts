import { Test } from '@nestjs/testing';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { CustomerGetDTO } from '../../../src/@core/dto/get-customer.dto';
import { GetCustomerApplication } from '../../../src/@core/applications/get-customer.application';
import { GetCustomerService } from '../../../src/@core/services/get-customer.service';

const customer: CustomerGetDTO = {
  id: 'any_id',
  name: 'any_name',
  document: 41233439880,
};

const getResponse: HttpResponse = {
  statusCode: 201,
  body: customer,
};

class MockedGetCustomerService {
  find = jest.fn().mockResolvedValue(getResponse);
}

describe('GetCustomerApplication', () => {
  let application: GetCustomerApplication;
  let service: GetCustomerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        GetCustomerApplication,
        {
          provide: GetCustomerService,
          useClass: MockedGetCustomerService,
        },
      ],
    }).compile();

    application = module.get<GetCustomerApplication>(GetCustomerApplication);
    service = module.get(GetCustomerService);
  });

  describe('find method', () => {
    it('should find customer by id', async () => {
      const sut = await application.find(customer.id!);
      const finded = sut.body;

      expect(finded.id).not.toBeNull();
      expect(finded.name).toEqual(customer.name);
      expect(finded.document).toEqual(customer.document);
      expect(service.find).toBeCalled();
    });
  });
});
