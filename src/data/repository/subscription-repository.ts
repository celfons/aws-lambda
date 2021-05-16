import { SubscriptionModel } from '../../domain/models/subscription-model'

export interface ISubscriptionRepository {
  create: (subscription: SubscriptionModel) => Promise<SubscriptionModel>
  get: () => Promise<SubscriptionModel[]>
  getSubscriptionByDueDate: (date: string) => Promise<SubscriptionModel[]>
}
