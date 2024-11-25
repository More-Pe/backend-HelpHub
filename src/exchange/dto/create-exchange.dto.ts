import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateExchangeDto {
  @ApiProperty({
    example: 'sdfsdfds31231311',
    description: 'id_user of transmitter',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  transmitter: string;

  @ApiProperty({
    example: 'sdfsdfdse1231231231311',
    description: 'id_user of reciever',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  reciever: string;

  @ApiProperty({
    example: 'progress',
    description: 'state of exchange',
    format: 'string',
  })
  @IsNotEmpty()
  @IsString()
  state: string;

  @ApiProperty({
    example: '12-10-2024',
    description: 'date of day',
    format: 'string',
  })
  @IsString()
  date: string;
}
