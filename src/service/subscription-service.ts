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
    const dueDate = this.buildDueDate(startDate, duration, period)
    return await this.repository.create({ id, customerId, offerId, startDate, duration, period, dueDate })
  }

  async get (): Promise<SubscriptionModel[]> {
    return await this.repository.get()
  }

  async getSubscriptionByDueDate (dueDate: string): Promise<SubscriptionModel[]> {
    return await this.repository.getSubscriptionByDueDate(dueDate)
  }

  buildDueDate (date: string, duration: number, period: string): string {
    const buildDate = new Date(date)
    if (period === 'DAYS') {
      const dueDate = buildDate.setDate(buildDate.getDate() + duration)
      return DateHelpper.format(new Date(dueDate))
    } else {
      const dueDate = buildDate.setMonth(buildDate.getMonth() + duration)
      return DateHelpper.format(new Date(dueDate))
    }
  }
}
