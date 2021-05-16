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
        subscription.dueDate,
        subscription.active
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

  async update (subscription: SubscriptionModel): Promise<SubscriptionModel> {
    try {
      await DynamoHelper.connect()
      const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
      await Model.update({ id: subscription.id }, {
        customerId: subscription.customerId,
        offerId: subscription.offerId,
        startDate: subscription.startDate,
        duration: subscription.duration,
        period: subscription.period,
        dueDate: subscription.dueDate,
        active: subscription.active
      })
      return subscription
    } catch (error) {
      return error
    }
  }

  async getSubscriptionByDueDate (dueDate: string): Promise<SubscriptionModel[]> {
    try {
      await DynamoHelper.connect()
      const Model = dynamoose.model('Subscriptions', SubscriptionSchema.getSchema())
      const conditional = new dynamoose.Condition().where('active').eq(true).and().where('dueDate').eq(dueDate)
      const subscriptions = await Model.scan(conditional).exec()
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
