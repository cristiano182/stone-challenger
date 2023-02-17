import { HttpResponse } from 'src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

export abstract class UpdateCustomerServiceInterface {
  abstract update(
    customerId: string,
    customerPayload: Customer,
  ): Promise<HttpResponse>;
}
