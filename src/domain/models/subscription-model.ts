export interface SubscriptionModel {
  id: string
  customerId: string
  offerId: string
  startDate: string
  duration: number
  period: string
  dueDate: string
  active: boolean
}

export interface AddSubscriptionModel {
  customerId: string
  offerId: string
  startDate: string
  duration: number
  period: string
}
