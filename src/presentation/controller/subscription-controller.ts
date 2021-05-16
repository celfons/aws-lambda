import { HttpResponse, HttpRequest, badRequest, serverError, ok, verifyParam } from './helpers'
import { ISubscription } from '../../domain/subscription'
import { Controller } from './controller'
import { MissingParamError, InvalidParamError } from '../errors'
import { IDateValidator } from './helpers/date-validator'

export class SubscriptionController implements Controller {
  private readonly service: ISubscription
  private readonly dateValidator: IDateValidator

  constructor (service: ISubscription, dateValidator: IDateValidator) {
    this.service = service
    this.dateValidator = dateValidator
  }

  async create (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['customerId', 'offerId', 'startDate', 'duration', 'period']
      const invalidParam = verifyParam(requiredField, httpRequest.body)
      if (invalidParam) {
        return badRequest(new MissingParamError(invalidParam))
      }
      const { customerId, offerId, startDate, duration, period } = httpRequest.body
      const isValid = this.dateValidator.isValid(httpRequest.body.startDate)
      if (!isValid) {
        return badRequest(new InvalidParamError('startDate'))
      }
      const subscription = await this.service.create({
        customerId,
        offerId,
        startDate,
        duration,
        period
      })
      return ok(subscription)
    } catch (error) {
      return serverError()
    }
  }

  async get (): Promise<HttpResponse> {
    try {
      const subscription = await this.service.get()
      return ok(subscription)
    } catch (error) {
      return serverError()
    }
  }

  async update (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const { id, customerId, offerId, startDate, duration, period, dueDate, active } = httpRequest.body
      const subscription = await this.service.update({ id, customerId, offerId, startDate, duration, period, dueDate, active })
      return ok(subscription)
    } catch (error) {
      return serverError()
    }
  }
}
