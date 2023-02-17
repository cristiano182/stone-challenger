import { Injectable } from '@nestjs/common';
import { RedisHelper } from '../infra/database/redis';
import { HttpResponse, notFound, success } from '../infra/protocols/http';
import { CUSTOMER_REDIS_PREFIX } from '../infra/constants/redis';
import { GetCustomerServiceInterface } from '../interfaces/services/get-customer-service.interface';

@Injectable()
export class GetCustomerService implements GetCustomerServiceInterface {
  async find(customerId: string): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();
    const customer = await redisClient.get(
      `${CUSTOMER_REDIS_PREFIX}:${customerId}`,
    );
    if (!customer) return notFound('Customer not found');

    return success(JSON.parse(customer));
  }
}
