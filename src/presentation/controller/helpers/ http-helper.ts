import { ServerError } from '../../errors/server-error'
import { HttpResponse } from '../helpers/http'

export const serverError = (): HttpResponse => ({
  statusCode: 500,
  body: new ServerError()
})

export const ok = (data: any): HttpResponse => ({
  statusCode: 200,
  body: data
})
