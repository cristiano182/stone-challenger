import { Injectable } from '@nestjs/common';
import { notFound, success, HttpResponse } from '../infra/protocols/http';
import { RedisHelper } from '../infra/database/redis';
import { CUSTOMER_REDIS_PREFIX } from '../infra/constants/redis';
import { Customer } from 'src/@core/domain/customer-entity';
import { UpdateCustomerServiceInterface } from '../interfaces/services/update-customer-service.interface';

@Injectable()
export class UpdateCustomerService implements UpdateCustomerServiceInterface {
  async update(
    customerId: string,
    customerPayload: Customer,
  ): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const customerPrefix = `${CUSTOMER_REDIS_PREFIX}:${customerId}`;

    const customer = await redisClient.get(customerPrefix);

    if (!customer) return notFound('Customer not found');

    const updatedCustomer = {
      ...JSON.parse(customer),
      ...customerPayload,
    };

    await redisClient.set(customerPrefix, JSON.stringify(updatedCustomer));

    return success(updatedCustomer);
  }
}
