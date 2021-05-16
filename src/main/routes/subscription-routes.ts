import { Router } from 'express'
import { makeSubscriptionController } from '../factory/subscription-controller-factory'

const subscriptionRouter = Router()
const subscriptionController = makeSubscriptionController()

subscriptionRouter.post('/subscriptions', (req, res) => {
  subscriptionController.create(req).then(function (data) {
    return res.send(data)
  }).catch(function (error) {
    return res.json(error)
  })
})

subscriptionRouter.get('/subscriptions', (req, res) => {
  subscriptionController.get().then(function (data) {
    return res.send(data)
  }).catch(function (error) {
    return res.json(error)
  })
})

subscriptionRouter.put('/subscriptions', (req, res) => {
  subscriptionController.update(req).then(function (data) {
    return res.send(data)
  }).catch(function (error) {
    return res.json(error)
  })
})

export default subscriptionRouter
