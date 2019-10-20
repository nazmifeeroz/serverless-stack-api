import * as dynamoDbLib from './libs/dynamodb-lib'
import {success, failure} from './libs/response-lib'

export const main = async event => {
  const params = {
    TableName: process.env.tableName,
    Key: {
      userId: event.requestContext.identity.cognitoIdentityId,
      noteId: event.pathParameters.id
    }
  }

  try {
    await dynamoDbLib.call('delete', params)
    return success({status: true})
  } catch (e) {
    return failure({status: false})
  }
}
