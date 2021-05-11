import { Controller } from '../../presentation/controller/controller'
import { SubscriptionController } from '../../presentation/controller/subscription-controller'
import { SubscriptionService } from '../../service/subscription-service'
import { SubscriptionRepository } from '../../infra/db/dynamodb/subscription-dynamodb'

export const makeSubscriptionController = (): Controller => {
  const repository = new SubscriptionRepository()
  const service = new SubscriptionService(repository)
  return new SubscriptionController(service)
}
