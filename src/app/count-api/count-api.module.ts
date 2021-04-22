import { Module, HttpModule } from '@nestjs/common'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { CountApiController } from './count-api.controller'
import { CountApiService } from './count-api.service'

@Module({
  imports: [HttpModule],
  controllers: [CountApiController],
  providers: [CountApiService, DynamoDBHelper],
  exports: [CountApiService],
})
export class CountApiModule {}
