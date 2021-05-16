import { IQueue } from '../../domain/queue'
import { ISubscription } from '../../domain/subscription'
import { DateHelpper } from '../../utils/date-helpper'
import { SubscriptionModel } from '../../domain/models/subscription-model'

export class SubscriptionJob {
  private readonly queue: IQueue
  private readonly service: ISubscription

  constructor (queue: IQueue, service: ISubscription) {
    this.queue = queue
    this.service = service
  }

  async run (): Promise<void> {
    const dueDate = DateHelpper.format(new Date())
    const subscriptions = await this.service.getSubscriptionByDueDate(dueDate)
    await this.queue.send(subscriptions, 'recurrent-billing')
    await this.setNewDueDate(subscriptions, dueDate)
  }

  async setNewDueDate (subscriptions: SubscriptionModel[], dueDate: string): Promise<void> {
    for (let i = 0; i < subscriptions.length; i++) {
      subscriptions[i].dueDate = DateHelpper.buildDueDate(dueDate, subscriptions[i].duration, subscriptions[i].period)
      await this.service.update(subscriptions[i])
    }
  }
}
