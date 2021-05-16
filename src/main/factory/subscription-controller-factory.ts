import { Controller } from '../../presentation/controller/controller'
import { SubscriptionController } from '../../presentation/controller/subscription-controller'
import { SubscriptionService } from '../../service/subscription-service'
import { SubscriptionRepository } from '../../infra/db/dynamodb/subscription-dynamodb'
import { DateValidatorAdapter } from '../../utils/date-validator-adapter'

export const makeSubscriptionController = (): Controller => {
  const repository = new SubscriptionRepository()
  const dateValidator = new DateValidatorAdapter()
  const service = new SubscriptionService(repository)
  return new SubscriptionController(service, dateValidator)
}
