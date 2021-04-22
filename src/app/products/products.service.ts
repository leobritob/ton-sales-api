import { Injectable } from '@nestjs/common'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { v4 as uuid } from 'uuid'

@Injectable()
export class ProductsService {
  private readonly tableName = 'ton_sales_products'

  constructor(private readonly dynamoDbHelper: DynamoDBHelper) {}

  async create(data: CreateProductDto) {
    const Item = {
      _id: { S: uuid() },
      name: { S: data.name },
      price: { N: data.price },
    }

    return await this.dynamoDbHelper.create(this.tableName, Item)
  }

  async findAll() {
    return await this.dynamoDbHelper.findAll(this.tableName)
  }

  async findOne(id: string) {
    return await this.dynamoDbHelper.findOne(this.tableName, { _id: { S: id } })
  }

  update(id: string, updateProductDto: UpdateProductDto) {
    return `This action updates a #${id} product`
  }

  remove(id: string) {
    return `This action removes a #${id} product`
  }
}
