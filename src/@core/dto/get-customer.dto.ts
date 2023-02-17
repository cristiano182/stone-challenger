import { ApiProperty } from '@nestjs/swagger';

export class CustomerGetDTO {
  @ApiProperty()
  name: string;

  @ApiProperty()
  document: number;

  @ApiProperty()
  id: string;
}
