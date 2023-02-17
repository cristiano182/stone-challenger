import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { notFound } from '../../../src/@core/infra/protocols/http';
import { RedisHelper } from '../../../src/@core/infra/database/redis';
import { CreateCustomerService } from '../../../src/@core/services/create-customer.service';
import { GetCustomerService } from '../../../src/@core/services/get-customer.service';
import { Customer } from 'src/@core/domain/customer-entity';

const customer: Customer = {
  name: 'any_name',
  document: 41233439880,
};

describe('GetCustomerService', () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient();
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe('find method', () => {
    it('should find a created customer', async () => {
      const createCustomerService = new CreateCustomerService();
      const getCustomerService = new GetCustomerService();

      const customerCreated = await createCustomerService.create(customer);
      const customerFinded = await getCustomerService.find(
        customerCreated.body.id.toString(),
      );
      expect(customerCreated.body.id).toEqual(customerFinded.body.id);
    });

    it('should return a not found customer error', async () => {
      const getCustomerService = new GetCustomerService();
      const anyoneId = uuidv4();

      const customerNotFoundResponse = await getCustomerService.find(anyoneId);

      const notFoundErrorDefination = notFound('Customer not found');

      expect(customerNotFoundResponse.statusCode).toEqual(
        notFoundErrorDefination.statusCode,
      );
      expect(customerNotFoundResponse.body).toEqual(
        notFoundErrorDefination.body,
      );
    });
  });
});
