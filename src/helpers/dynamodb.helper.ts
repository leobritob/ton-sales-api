import { Injectable } from '@nestjs/common'
import * as AWS from 'aws-sdk'
import { AttributeMap, PutItemInputAttributeMap } from 'aws-sdk/clients/dynamodb'

@Injectable()
export class DynamoDBHelper {
  private dynamoDB: AWS.DynamoDB

  constructor() {
    this.dynamoDB = new AWS.DynamoDB({
      apiVersion: '2012-10-08',
      region: 'us-east-1',
      credentials: {
        accessKeyId: process.env.ACCESS_KEY_ID,
        secretAccessKey: process.env.SECRET_ACCESS_KEY,
      },
    })
  }

  async findAll(tableName: string) {
    let result = []

    try {
      const rows = await this.dynamoDB.scan({ TableName: tableName }).promise()

      result = this.itemTransformList(rows.Items)
    } catch (e) {
      console.log('scan error: ' + e.message)
    }

    return result
  }

  async create(tableName: string, item: PutItemInputAttributeMap) {
    return new Promise((resolve, reject) => {
      const params = { TableName: tableName, Item: item }

      this.dynamoDB.putItem(params, (err, data) => {
        if (err) return reject(err)

        return resolve(this.itemTransform(item))
      })
    })
  }

  async findOne(tableName: string, key: any, projectionExpression: string) {
    const params = {
      TableName: tableName,
      Key: key,
      ProjectionExpression: projectionExpression,
    }

    return new Promise((resolve, reject) => {
      this.dynamoDB.getItem(params, (err, data) => {
        if (err) return reject(err)

        return resolve(this.itemTransform(data.Item))
      })
    })
  }

  itemTransformList(items: AWS.DynamoDB.ItemList) {
    return items.map(this.itemTransform)
  }

  itemTransform(item: AttributeMap) {
    const keys = Object.keys(item)

    let result = {}

    keys.forEach((key) => {
      result[key] = Object.values(item[key])[0]
    })

    return result
  }
}
