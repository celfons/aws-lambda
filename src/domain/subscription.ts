import { SubscriptionModel } from './models/subscription-model'

export interface ISubscription {
  create: (subscription: SubscriptionModel) => Promise<SubscriptionModel>
  get: () => Promise<SubscriptionModel[]>
}
