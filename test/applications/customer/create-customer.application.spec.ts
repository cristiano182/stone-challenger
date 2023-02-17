import { Test } from '@nestjs/testing';
import { HttpResponse } from '../../../src/@core/infra/protocols/http';
import { CustomerCreateDTO } from '../../../src/@core/dto/create-customer.dto';
import { CreateCustomerApplication } from '../../../src/@core/applications/create-customer.application';
import { CreateCustomerService } from '../../../src/@core/services/create-customer.service';

const customer: CustomerCreateDTO = {
  name: 'any_name',
  document: 41233439880,
};

const createdResponse: HttpResponse = {
  statusCode: 201,
  body: customer,
};

class MockedCreateCustomerService {
  create = jest.fn().mockResolvedValue(createdResponse);
}

describe('CreateCustomerApplication', () => {
  let application: CreateCustomerApplication;
  let service: CreateCustomerService;

  beforeAll(async () => {
    const module = await Test.createTestingModule({
      providers: [
        CreateCustomerApplication,
        {
          provide: CreateCustomerService,
          useClass: MockedCreateCustomerService,
        },
      ],
    }).compile();

    application = module.get<CreateCustomerApplication>(
      CreateCustomerApplication,
    );
    service = module.get(CreateCustomerService);
  });

  describe('create method', () => {
    it('should create a new customer', async () => {
      const sut = await application.create(customer);
      const created = sut.body;

      expect(created.id).not.toBeNull();
      expect(created.name).toEqual(customer.name);
      expect(created.document).toEqual(customer.document);
      expect(service.create).toBeCalled();
    });
  });
});
