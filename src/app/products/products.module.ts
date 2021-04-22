import { Module } from '@nestjs/common'
import { ProductsService } from './products.service'
import { ProductsController } from './products.controller'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'

@Module({
  controllers: [ProductsController],
  providers: [ProductsService, DynamoDBHelper],
  exports: [ProductsService],
})
export class ProductsModule {}
