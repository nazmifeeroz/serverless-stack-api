import * as dynamoDbLib from './libs/dynamodb-lib'
import { success, failure } from './libs/response-lib'

export const main = async (event, _context) => {
  const params = {
    TableName: process.env.tableName,
    KeyConditionExpression: 'userId = :userId',
    ExpressionAttributeValues: {
      ':userId': event.requestContext.identity.cognitoIdentityId,
    },
  }

  try {
    const result = await dynamoDbLib.call('query', params)
    return success(result.Items)
  } catch (e) {
    return failure({ status: false })
  }
}
