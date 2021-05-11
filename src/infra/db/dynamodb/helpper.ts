import * as dynamoose from 'dynamoose'
import config from 'config'

export const DynamoHelper = {
  async connect () {
    dynamoose.aws.sdk.config.update({ region: config.get('AWS_REGION') })
    dynamoose.aws.ddb.local()
  }
}
