import express from 'express'
import subscriptionRouter from '../routes/subscription-routes'

const app = express()

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(subscriptionRouter)

export default app
