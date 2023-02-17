import { Injectable } from '@nestjs/common';
import { notFound, success, HttpResponse, idConflict } from '../infra/protocols/http';
import { RedisHelper } from '../infra/database/redis';
import { CUSTOMER_REDIS_PREFIX } from '../infra/constants/redis';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';
import { CustomerUpdateDTO } from '../dto/update-customer.dto';

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  async update(
    customerId: string,
    customerPayload: CustomerUpdateDTO,
  ): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const customer = await redisClient.get(`${CUSTOMER_REDIS_PREFIX}:${customerId}`);

    if (!customer) return notFound('customer not found');

    if(customerId !== customerPayload.id) {
      const prefixAlreadyExists = await redisClient.get(`${CUSTOMER_REDIS_PREFIX}:${customerPayload.id}`);
      if(prefixAlreadyExists)  return idConflict('ID conflict');
    }
    
    const prefixKey = `${CUSTOMER_REDIS_PREFIX}:${customerPayload.id}`;

    await redisClient.set(prefixKey,JSON.stringify(customerPayload));

    if (customerId !== customerPayload.id)  await redisClient.del(customerId);
    
    return success(customerPayload);
  }
}



