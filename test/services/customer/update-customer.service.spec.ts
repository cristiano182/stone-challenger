import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { notFound } from '../../../src/@core/infra/protocols/http';
import { RedisHelper } from '../../../src/@core/infra/database/redis';
import { CreateCustomerService } from '../../../src/@core/services/create-customer.service';
import { UpdateCustomerService } from '../../../src/@core/services/update-customer.service';
import { Customer } from 'src/@core/domain/customer-entity';

const customer: Customer = {
  name: 'any_name',
  document: 41233439890,
};

describe('UpdateCustomerService', () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient();
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe('update method', () => {
    it('should update a customer', async () => {
      const createCustomerService = new CreateCustomerService();
      const updateCustomerService = new UpdateCustomerService();

      const createdCustomer = await createCustomerService.create(customer);

      const payload: Customer = {
        name: 'updated_name',
        document: 41233439890,
      };
      const updatedCustomer = await updateCustomerService.update(
        createdCustomer.body.id,
        payload,
      );

      expect(updatedCustomer.body.name).toEqual(payload.name);
      expect(updatedCustomer.body.document).toEqual(payload.document);
    });

    it('should return not found customer', async () => {
      const updateCustomerService = new UpdateCustomerService();

      const anyOneId = uuidv4();

      const payload: Customer = {
        name: 'updated_name',
        document: 41233439890,
      };

      const customerNotFoundResponse = await updateCustomerService.update(
        anyOneId,
        payload,
      );

      const notFoundError = notFound('Customer not found');

      expect(customerNotFoundResponse.statusCode).toEqual(
        notFoundError.statusCode,
      );
      expect(customerNotFoundResponse.body).toEqual(notFoundError.body);
    });
  });
});
