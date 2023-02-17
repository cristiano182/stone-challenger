import { HttpResponse } from '../../infra/protocols/http';

export abstract class GetCustomerApplicationInterface {
  abstract find(customerId: string): Promise<HttpResponse>;
}
