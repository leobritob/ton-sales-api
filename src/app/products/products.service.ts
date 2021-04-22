import { Injectable } from '@nestjs/common'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { CreateProductDto } from './dto/create-product.dto'
import { UpdateProductDto } from './dto/update-product.dto'
import { v4 as uuid } from 'uuid'
import { IUpdateDynamoItem } from '../../helpers/dynamodb.interface'

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

  async update(id: string, data: UpdateProductDto) {
    const attributeNames = {
      '#name': 'name',
      '#price': 'price',
    }

    const attributeValues = {
      ':name': { S: data.name },
      ':price': { N: data.price },
    }

    const key = {
      _id: { S: id },
    }

    const updateExpression = 'SET #name = :name, #price = :price'

    const options: IUpdateDynamoItem = {
      attributeNames,
      attributeValues,
      key,
      updateExpression,
    }

    return await this.dynamoDbHelper.update(this.tableName, options)
  }

  remove(id: string) {
    return `This action removes a #${id} product`
  }
}
