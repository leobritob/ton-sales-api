import { Injectable } from '@nestjs/common'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'

@Injectable()
export class ProductsService {
  constructor(private readonly dynamoDbHelper: DynamoDBHelper) {}

  create(createProductDto: CreateProductDto) {
    return 'This action adds a new product'
  }

  async findAll() {
    return await this.dynamoDbHelper.scan('ton_sales_products')
  }

  findOne(id: number) {
    return `This action returns a #${id} product`
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: number) {
    return `This action removes a #${id} product`
  }
}
