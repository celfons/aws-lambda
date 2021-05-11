import * as dynamoose from 'dynamoose'
import { DynamoHelper } from './helpper'
import { ISubscriptionRepository } from '../../../data/repository/subscription-repository'
import { SubscriptionDocument, SubscriptionSchema } from '../dynamodb/documents/subscription-document'
import { SubscriptionModel } from '../../../domain/models/subscription-model'
import { v4 as uuidv4 } from 'uuid'

export class SubscriptionRepository implements ISubscriptionRepository {
  async create (subscription: SubscriptionModel): Promise<SubscriptionModel> {
    try {
      await DynamoHelper.connect()
      const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
      const document = new SubscriptionDocument(
        uuidv4(),
        subscription.customerId,
        subscription.offerId,
        subscription.startDate,
        subscription.duration,
        subscription.period
      )
      const model = new Model(document)
      await model.save()
      return await new Promise(resolve => resolve(document))
    } catch (error) {
      return error
    }
  }

  async get (): Promise<SubscriptionModel[]> {
    await DynamoHelper.connect()
    const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
    const subscriptions = await Model.scan().exec()
    const result: SubscriptionModel[] = []
    if (subscriptions.count !== 0) {
      subscriptions.forEach((item, index, arr) => {
        result.push(arr[index] as Object as SubscriptionDocument)
      })
    }
    return new Promise(resolve => resolve(result))
  }
}
