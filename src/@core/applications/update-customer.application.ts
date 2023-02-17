import { Injectable } from '@nestjs/common';
import { HttpResponse } from 'src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';
import { UpdateCustomerApplicationInterface } from '../interfaces/applications/update-customer.application.interface';
import { UpdateCustomerService } from '../services/update-customer.service';

@Injectable()
export class UpdateCustomerApplication
  implements UpdateCustomerApplicationInterface
{
  constructor(private updateCustomerService: UpdateCustomerService) {}

  async update(
    customerId: string,
    customerPayload: Customer,
  ): Promise<HttpResponse> {
    return this.updateCustomerService.update(customerId, customerPayload);
  }
}
