import { Response } from 'express';
import { Controller, Post, Body, Res } from '@nestjs/common';
import { ApiCreatedResponse, ApiTags } from '@nestjs/swagger';
import { CustomerCreateDTO } from '../dto/create-customer.dto';
import { CreateCustomerApplication } from '../applications/create-customer.application';

@Controller('customers')
@ApiTags('Customers')
export class CreateCustomerController {
  constructor(private createCustomerApplication: CreateCustomerApplication) {}

  @ApiCreatedResponse({
    description: 'Create a new customer',
    type: CustomerCreateDTO,
  })
  @Post()
  async create(@Body() customerPayload: CustomerCreateDTO, @Res() response: Response) {
    const createCustomer = await this.createCustomerApplication.create(
      customerPayload,
    );
    return response.status(createCustomer.statusCode).json(createCustomer.body);
  }
}
