import * as dynamoose from 'dynamoose'
import { DynamoHelper } from './helpper'
import { ISubscriptionRepository } from '../../../data/repository/subscription-repository'
import { SubscriptionDocument, SubscriptionSchema } from '../dynamodb/documents/subscription-document'
import { SubscriptionModel } from '../../../domain/models/subscription-model'

export class SubscriptionRepository implements ISubscriptionRepository {
  async create (subscription: SubscriptionModel): Promise<SubscriptionModel> {
    try {
      await DynamoHelper.connect()
      const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
      const document = new SubscriptionDocument(
        subscription.id,
        subscription.customerId,
        subscription.offerId,
        subscription.startDate,
        subscription.duration,
        subscription.period,
        subscription.dueDate
      )
      const model = new Model(document)
      await model.save()
      return await new Promise(resolve => resolve(document))
    } catch (error) {
      return error
    }
  }

  async get (): Promise<SubscriptionModel[]> {
    try {
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
    } catch (error) {
      return error
    }
  }

  async getSubscriptionByDueDate (dueDate: string): Promise<SubscriptionModel[]> {
    try {
      await DynamoHelper.connect()
      const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
      const subscriptions = await Model.query('dueDate').eq(dueDate).exec()
      const result: SubscriptionModel[] = []
      if (subscriptions.count !== 0) {
        subscriptions.forEach((item, index, arr) => {
          result.push(arr[index] as Object as SubscriptionDocument)
        })
      }
      return new Promise(resolve => resolve(result))
    } catch (error) {
      return error
    }
  }
}
