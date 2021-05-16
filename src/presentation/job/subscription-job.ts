import { IQueue } from '../../domain/queue'
import { ISubscription } from '../../domain/subscription'
import { DateHelpper } from '../../utils/date-helpper'

export class SubscriptionJob {
  private readonly queue: IQueue
  private readonly service: ISubscription

  constructor (queue: IQueue, service: ISubscription) {
    this.queue = queue
    this.service = service
  }

  async run (): Promise<void> {
    const dueDate = DateHelpper.format(new Date())
    const message = await this.service.getSubscriptionByDueDate(dueDate)
    await this.queue.send(message, 'recurrent-billing')
  }
}
