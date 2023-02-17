import { Response } from 'express';
import {
  Controller,
  Body,
  Param,
  ParseUUIDPipe,
  Put,
  Res,
} from '@nestjs/common';
import { ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { CustomerUpdateDTO } from '../dto/update-customer.dto';
import { UpdateCustomerApplication } from '../applications/update-customer.application';

@Controller('customers')
@ApiTags('Customers')
export class UpdateCustomerController {
  constructor(private updateCustomerApplication: UpdateCustomerApplication) {}

  @ApiOkResponse({
    description: 'Update customer with ID params',
    type: CustomerUpdateDTO,
  })
  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) customerId: string,
    @Body() customerPayload: CustomerUpdateDTO,
    @Res() response: Response,
  ) {
    const updateCustomer = await this.updateCustomerApplication.update(
      customerId,
      customerPayload,
    );
    return response.status(updateCustomer.statusCode).json(updateCustomer.body);
  }
}
