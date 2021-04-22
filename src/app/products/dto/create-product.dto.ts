import { IsDecimal, IsNotEmpty, MaxLength } from 'class-validator'

export class CreateProductDto {
  @IsNotEmpty()
  @MaxLength(255)
  name: string

  @IsNotEmpty()
  @IsDecimal({ force_decimal: true, decimal_digits: '2'})
  price: string
}
