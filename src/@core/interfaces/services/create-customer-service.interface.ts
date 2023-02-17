import { HttpResponse } from 'src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

export abstract class CreateCustomerServiceInterface {
  abstract create(customerPayload: Customer): Promise<HttpResponse>;
}
