import { Redis } from 'ioredis';
import { Customer } from 'src/@core/domain/customer-entity';
import { RedisHelper } from '../../../../src/@core/infra/database/redis';
import { v4 as uuidv4 } from 'uuid';

jest.setTimeout(100000);

const customer: Customer = {
  id: uuidv4(),
  name: 'any_name',
  document: 41233439880,
};

describe('@Database -> Redis', () => {
  let redisClient: Redis;

  afterAll(async () => {
    redisClient && (await redisClient.quit());
  });

  beforeAll(async () => {
    redisClient = await RedisHelper.getClient();
  });

  it('should create and find a new customer', async () => {
    await redisClient.set(customer.id!, JSON.stringify(customer));
    const response: any = await redisClient.get(customer.id!);
    const parsed: Customer = JSON.parse(response);
    expect(parsed).toEqual(customer);
    await redisClient.del(customer.id!);
  });
});
