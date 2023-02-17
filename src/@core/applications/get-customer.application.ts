import { Injectable } from '@nestjs/common';
import { HttpResponse } from '../infra/protocols/http';
import { GetCustomerApplicationInterface } from '../interfaces/applications/get-customer.application.interface';
import { GetCustomerService } from '../services/get-customer.service';

@Injectable()
export class GetCustomerApplication implements GetCustomerApplicationInterface {
  constructor(private getCustomerService: GetCustomerService) {}

  async find(customerId: string): Promise<HttpResponse> {
    return this.getCustomerService.find(customerId);
  }
}
