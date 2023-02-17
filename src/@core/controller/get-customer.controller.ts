import { Controller, Get, Param, ParseUUIDPipe, Res } from '@nestjs/common';
import { ApiNotFoundResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomerGetDTO } from '../dto/get-customer.dto';
import { Response } from 'express';
import { GetCustomerApplication } from '../applications/get-customer.application';

@Controller('customers')
@ApiTags('Customers')
export class GetCustomerController {
  constructor(private getCustomerApplication: GetCustomerApplication) {}

  @ApiOkResponse({
    description: 'Get customer with ID params',
    type: CustomerGetDTO,
  })
  @ApiNotFoundResponse({
    description: 'Customer not found',
  })
  @Get(':id')
  async find(
    @Param('id', new ParseUUIDPipe()) customerId: string,
    @Res() response: Response,
  ) {
    const getCustomer = await this.getCustomerApplication.find(customerId);
    return response.status(getCustomer.statusCode).json(getCustomer.body);
  }
}
