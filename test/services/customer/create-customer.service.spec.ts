import { Redis } from 'ioredis';
import { RedisHelper } from '../../../src/@core/infra/database/redis';
import { CreateCustomerService } from '../../../src/@core/services/create-customer.service';
import { CustomerCreateDTO } from '../../../src/@core/dto/create-customer.dto';

jest.setTimeout(100000);


const customer: CustomerCreateDTO = {
  name: 'any_name',
  document: 41233439880,
};

describe('CreateCustomerService', () => {
  let redisClient: Redis;

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient();
  });

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  describe('create method', () => {
    it('should create a new customer', async () => {
      const sut = new CreateCustomerService();

      const response = await sut.create(customer);
      const created = response.body;

      expect(created.id).not.toBeNull();
      expect(created.name).toEqual(customer.name);
      expect(created.document).toEqual(customer.document);
    });
  });
});
