import {
  ExpressionAttributeNameMap,
  ExpressionAttributeValueMap,
  UpdateExpression,
  Key,
} from 'aws-sdk/clients/dynamodb'

export interface IUpdateDynamoItem {
  attributeNames: ExpressionAttributeNameMap
  attributeValues: ExpressionAttributeValueMap
  key: Key
  updateExpression: UpdateExpression
}
