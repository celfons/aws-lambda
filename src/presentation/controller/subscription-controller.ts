import { HttpResponse, HttpRequest } from './helpers/http'
import { badRequest, serverError, ok } from './helpers/ http-helper'
import { ISubscription } from '../../domain/subscription'
import { Controller } from './controller'
import { verifyParam } from './helpers/validate-helper'
import { MissingParamError } from '../errors/missing-param-error'

export class SubscriptionController implements Controller {
  private readonly service: ISubscription

  constructor (service: ISubscription) {
    this.service = service
  }

  async create (httpRequest: HttpRequest): Promise<HttpResponse> {
    try {
      const requiredField = ['customerId', 'offerId', 'startDate', 'duration', 'period']
      const invalidParam = verifyParam(requiredField, httpRequest.body)
      if (invalidParam) {
        return badRequest(new MissingParamError(invalidParam))
      }
      const { customerId, offerId, startDate, duration, period } = httpRequest.body
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
}