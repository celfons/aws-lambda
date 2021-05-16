import serverless from 'serverless-http'
import { makeSubscriptionJob } from './factory/subscription-job-factory'
import app from './config/express'

module.exports.api = serverless(app)

module.exports.run = async () => {
  const job = makeSubscriptionJob()
  await job.run()
}
