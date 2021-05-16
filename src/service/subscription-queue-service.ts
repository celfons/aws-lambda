import { IQueue } from '../domain/queue'
import { ISubscriptionQueue } from '../data/queue/subscription-queue'

export class SubscriptionQueueService implements IQueue {
  private readonly queue: ISubscriptionQueue

  constructor (queue: ISubscriptionQueue) {
    this.queue = queue
  }

  async send (message: any, topic: string): Promise<void> {
    return await this.queue.send(message, topic)
  }
}
