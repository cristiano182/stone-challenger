import { Redis } from 'ioredis';
import { v4 as uuidv4 } from 'uuid';
import { notFound,idConflict } from '../../../src/@core/infra/protocols/http';
import { RedisHelper } from '../../../src/@core/infra/database/redis';
import { CreateCustomerService } from '../../../src/@core/services/create-customer.service';
import { UpdateCustomerService } from '../../../src/@core/services/update-customer.service';
import { CustomerUpdateDTO } from '../../../src/@core/dto/update-customer.dto';
import { CustomerCreateDTO } from '../../../src/@core/dto/create-customer.dto';

jest.setTimeout(100000);


const customer: CustomerCreateDTO = {
  name: 'any_name',
  document: 41233439880,
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

      
      const created = await createCustomerService.create(customer);

      const uuid = uuidv4();

      const payload: CustomerUpdateDTO = {
        id: uuid,
        name: 'updated_name',
        document: 41233439880,
      };

      const updated = await updateCustomerService.update(
        created.body.id,
        payload,
      );

      expect(updated.body.id).toEqual(uuid);
      expect(updated.body.name).toEqual(payload.name);
      expect(updated.body.document).toEqual(payload.document);
    });

    it('should return not found customer', async () => {
      const updateCustomerService = new UpdateCustomerService();

      const anyOneId = uuidv4();

      const payload: CustomerUpdateDTO = {
        id: "any_id",
        name: 'updated_name',
        document: 41233439890,
      };

      const customerNotFoundResponse = await updateCustomerService.update(
        anyOneId,
        payload,
      );

      const notFoundError = notFound('customer not found');

      expect(customerNotFoundResponse.statusCode).toEqual(
        notFoundError.statusCode,
      );
      expect(customerNotFoundResponse.body).toEqual(notFoundError.body);
    });

    it('should return customer id conflict', async () => {
      const createCustomerService = new CreateCustomerService();
      const updateCustomerService = new UpdateCustomerService();

      const created = await createCustomerService.create(customer);
      const createDuplicated =  await createCustomerService.create(customer);

    
      const payload : CustomerUpdateDTO = {
        id: createDuplicated.body.id,
        name: 'updated_name',
        document: 41233439880,
      };

      const updatedConflict = await updateCustomerService.update(created.body.id, payload);

      const conflictError = idConflict('ID conflict');

      expect(updatedConflict.statusCode).toEqual(
        conflictError.statusCode,
      );
      expect(updatedConflict.body).toEqual(
        conflictError.body,
      );
    });
  });
});
