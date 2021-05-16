import { ISubscription } from '../domain/subscription'
import { ISubscriptionRepository } from '../data/repository/subscription-repository'
import { AddSubscriptionModel, SubscriptionModel } from '../domain/models/subscription-model'
import { DateHelpper } from '../utils/date-helpper'
import { v4 as uuidv4 } from 'uuid'

export class SubscriptionService implements ISubscription {
  private readonly repository: ISubscriptionRepository

  constructor (repository: ISubscriptionRepository) {
    this.repository = repository
  }

  async create (subscription: AddSubscriptionModel): Promise<SubscriptionModel> {
    const id = uuidv4()
    const { customerId, offerId, startDate, duration, period } = subscription
    const dueDate = DateHelpper.buildDueDate(startDate, duration, period)
    const active = true
    return await this.repository.create({ id, customerId, offerId, startDate, duration, period, dueDate, active })
  }

  async get (): Promise<SubscriptionModel[]> {
    return await this.repository.get()
  }

  async update (subscription: SubscriptionModel): Promise<SubscriptionModel> {
    return await this.repository.update(subscription)
  }

  async getSubscriptionByDueDate (dueDate: string): Promise<SubscriptionModel[]> {
    return await this.repository.getSubscriptionByDueDate(dueDate)
  }
}
