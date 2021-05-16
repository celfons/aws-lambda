import { HttpRequest, HttpResponse } from '../controller/helpers/http'

export interface Controller {
  create: (httpRequest: HttpRequest) => Promise<HttpResponse>
  get: () => Promise<HttpResponse>
  update: (httpRequest: HttpRequest) => Promise<HttpResponse>
}
