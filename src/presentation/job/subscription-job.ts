import { IQueue } from '../../domain/queue'
import { ISubscription } from '../../domain/subscription'

export class SubscriptionJob {
  private readonly queue: IQueue
  private readonly service: ISubscription

  constructor (queue: IQueue, service: ISubscription) {
    this.queue = queue
    this.service = service
  }

  async run (): Promise<void> {
    const message = await this.service.get()
    await this.queue.send(message)
  }
}
