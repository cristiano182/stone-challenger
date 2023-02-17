import { HttpResponse } from '../../infra/protocols/http';

export abstract class GetCustomerServiceInterface {
  abstract find(customerId: string): Promise<HttpResponse>;
}
