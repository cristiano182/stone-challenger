import { IsString, IsNumber, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class Customer {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  document: number;

  @ApiProperty()
  id?: string;
}

export abstract class CustomerDTO {
  id: string;
  name: string;
  document: number;
}
