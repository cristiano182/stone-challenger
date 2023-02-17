import { Injectable } from '@nestjs/common';
import { HttpResponse } from '../infra/protocols/http';
import { CustomerCreateDTO } from '../dto/create-customer.dto';
import { CreateCustomerApplicationInterface } from '../interfaces/applications/create-customer.application.interface';
import { CreateCustomerService } from '../services/create-customer.service';

@Injectable()
export class CreateCustomerApplication
  implements CreateCustomerApplicationInterface
{
  constructor(private createCustomerService: CreateCustomerService) {}

  async create(customerPayload: CustomerCreateDTO): Promise<HttpResponse> {
    return this.createCustomerService.create(customerPayload);
  }
}
