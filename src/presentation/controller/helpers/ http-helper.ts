import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../helpers/http'

export const badRequest = (error: Error): HttpResponse => ({
  body: error
})

export const serverError = (): HttpResponse => ({
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  body: data
})
