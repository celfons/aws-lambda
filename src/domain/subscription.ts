import { AddSubscriptionModel, SubscriptionModel } from './models/subscription-model'

export interface ISubscription {
  create: (subscription: AddSubscriptionModel) => Promise<SubscriptionModel>
  get: () => Promise<SubscriptionModel[]>
  getSubscriptionByDueDate: (dueDate: string) => Promise<SubscriptionModel[]>
}
