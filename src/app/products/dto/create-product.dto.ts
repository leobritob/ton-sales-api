import { ApiProperty } from '@nestjs/swagger'
import { IsDecimal, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(255)
  @ApiProperty()
  name: string

  @IsNotEmpty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2' })
  @ApiProperty()
  price: string
}
