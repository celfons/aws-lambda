import { ISubscription } from '../domain/subscription'
import { ISubscriptionRepository } from '../data/repository/subscription-repository'
import { SubscriptionModel } from '../domain/models/subscription-model'

export class SubscriptionService implements ISubscription {
  private readonly repository: ISubscriptionRepository

  constructor (repository: ISubscriptionRepository) {
    this.repository = repository
  }

  async create (subscription: SubscriptionModel): Promise<SubscriptionModel> {
    return await this.repository.create(subscription)
  }

  async get (): Promise<SubscriptionModel[]> {
    return await this.repository.get()
  }
}
