import { HttpService, Injectable } from '@nestjs/common'
import { DynamoDBHelper } from '../../helpers/dynamodb.helper'
import { IUpdateDynamoItem } from '../../helpers/dynamodb.interface'

@Injectable()
export class CountApiService {
  private tableName = 'ton_sales_counts'

  constructor(private readonly httpService: HttpService, private readonly dynamoDBHelper: DynamoDBHelper) {}

  async newAppHit(context: string) {
    const result = { context, count: 0 }

    const response = await this.httpService
      .get<{ value: number }>(`https://api.countapi.xyz/hit/tonsales/${context}`)
      .toPromise()

    if (response.status === 200) {
      const value = response.data.value

      result.count = value
      await this.saveCount(context, value)
    }

    return result
  }

  async getAppHits(context: string) {
    const result = { context: context, count: 0 }

    const key = {
      context: { S: context },
    }

    const item: any = await this.dynamoDBHelper.findOne(this.tableName, key)

    result.count = item?.count ? Number(item.count) : 0

    return result
  }

  async saveCount(context: string, count: number) {
    const options: IUpdateDynamoItem = {
      attributeNames: {
        '#count': 'count',
      },
      attributeValues: {
        ':count': { N: String(count) },
      },
      key: {
        context: { S: context },
      },
      updateExpression: 'SET #count = :count',
    }

    await this.dynamoDBHelper.updateItem(this.tableName, options)
  }
}
