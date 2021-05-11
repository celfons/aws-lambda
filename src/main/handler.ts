import { Router } from 'express'
import serverless from 'serverless-http'
import { makeSubscriptionController } from './factory/subscription-controller-factory'
import { makeSubscriptionJob } from './factory/subscription-job-factory'

module.exports.api = async () => {
  const router = Router()
  const controller = makeSubscriptionController()
  router.post('/subscriptions', function (request, response) {
    response.send(controller.create(request))
  })
  router.get('/subscriptions', function (request, response) {
    response.send(controller.get())
  })
  serverless(router)
}

module.exports.run = async () => {
  const job = makeSubscriptionJob()
  await job.run()
}
