import { IsString, IsNumber, IsNotEmpty, IsUUID } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CustomerUpdateDTO {
  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @ApiProperty()
  document: number;

  @IsNotEmpty()
  @IsString()
  @IsUUID(4, { each: true })
  @ApiProperty()
  id: string;
}
