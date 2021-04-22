import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
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
    const product = await this.dynamoDbHelper.findOne(this.tableName, { _id: { S: id } })

    if (!product) throw new NotFoundException()

    return product
  }

  async update(id: string, data: UpdateProductDto) {
    await this.findOne(id)

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

    try {
      return await this.dynamoDbHelper.updateItem(this.tableName, options)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }

  async remove(id: string) {
    await this.findOne(id)

    const key = {
      _id: { S: id },
    }

    try {
      return await this.dynamoDbHelper.deleteItem(this.tableName, key)
    } catch (e) {
      throw new BadRequestException(e.message)
    }
  }
}
