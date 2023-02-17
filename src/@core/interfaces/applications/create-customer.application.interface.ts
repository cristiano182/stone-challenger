import { HttpResponse } from 'src/@core/infra/protocols/http';
import { Customer } from 'src/@core/domain/customer-entity';

export abstract class CreateCustomerApplicationInterface {
  abstract create(customerPayload: Customer): Promise<HttpResponse>;
}
