import { v4 as uuidv4 } from 'uuid';
import { Injectable } from '@nestjs/common';
import { RedisHelper } from '../infra/database/redis';
import { created, HttpResponse } from '../infra/protocols/http';
import { CUSTOMER_REDIS_PREFIX } from '../infra/constants/redis';
import { CustomerCreateDTO } from 'src/@core/dto/create-customer.dto';
import { CreateCustomerServiceInterface } from '../interfaces/services/create-customer-service.interface';

@Injectable()
export class CreateCustomerService implements CreateCustomerServiceInterface {
  async create(customerPayload: CustomerCreateDTO): Promise<HttpResponse> {
    const redisClient = await RedisHelper.getClient();

    const generatedUUID = uuidv4();
    const prefixNewCustomer = `${CUSTOMER_REDIS_PREFIX}:${generatedUUID}`;

    const newCustomer = JSON.stringify({
      id: generatedUUID,
      ...customerPayload,
    });

    await redisClient.set(prefixNewCustomer, newCustomer);

    const createdCustomer = await redisClient.get(prefixNewCustomer);

    return created(JSON.parse(createdCustomer));
  }
}
