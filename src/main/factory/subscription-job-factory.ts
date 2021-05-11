import { SubscriptionJob } from '../../presentation/job/subscription-job'
import { SubscriptionKafkaQueue } from '../../infra/kafka/subscription-kafka'
import { SubscriptionQueueService } from '../../service/subscription-queue-service'
import { SubscriptionService } from '../../service/subscription-service'
import { SubscriptionRepository } from '../../infra/db/dynamodb/subscription-dynamodb'

export const makeSubscriptionJob = (): SubscriptionJob => {
  const producer = new SubscriptionKafkaQueue()
  const repository = new SubscriptionRepository()
  const queue = new SubscriptionQueueService(producer)
  const service = new SubscriptionService(repository)
  return new SubscriptionJob(queue, service)
}
