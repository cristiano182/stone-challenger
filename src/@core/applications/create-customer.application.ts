import { Injectable } from '@nestjs/common';
import { HttpResponse } from '../infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';
import { CreateCustomerApplicationInterface } from '../interfaces/applications/create-customer.application.interface';
import { CreateCustomerService } from '../services/create-customer.service';

@Injectable()
export class CreateCustomerApplication
  implements CreateCustomerApplicationInterface
{
  constructor(private createCustomerService: CreateCustomerService) {}

  async create(customerPayload: Customer): Promise<HttpResponse> {
    return this.createCustomerService.create(customerPayload);
  }
}
