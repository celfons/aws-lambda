import { SubscriptionModel } from '../../../../domain/models/subscription-model'
import { Schema } from 'dynamoose/dist/Schema'

export class SubscriptionDocument implements SubscriptionModel {
  constructor (
    id: string,
    customerId: string,
    offerId: string,
    startDate: string,
    duration: number,
    period: string,
    dueDate: string
  ) {
    this.id = id
    this.customerId = customerId
    this.offerId = offerId
    this.startDate = startDate
    this.duration = duration
    this.period = period
    this.dueDate = dueDate
  }

  id: string
  customerId: string
  offerId: string
  startDate: string
  duration: number
  period: string
  dueDate: string
}

export const SubscriptionSchema = {
  getSchema (): Schema {
    return new Schema({
      id: String,
      customerId: String,
      offerId: String,
      startDate: String,
      duration: Number,
      period: String,
      dueDate: String
    })
  }
}
