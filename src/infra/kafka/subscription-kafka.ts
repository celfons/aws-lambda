import config from 'config'
import * as kafkajs from 'kafkajs'
import { ISubscriptionQueue } from '../../data/queue/subscription-queue'

export class SubscriptionKafkaQueue implements ISubscriptionQueue {
  async send (message, topic: string): Promise<void> {
    const kafka = new kafkajs.Kafka({
      clientId: config.get('CLIENT_ID'),
      brokers: [config.get('BROKERS')]
    })
    const producer = kafka.producer()
    const value = JSON.stringify(message)
    await producer.connect()
    await producer.send({
      topic: topic,
      messages: [
        { value: value }
      ]
    }).then(console.log).catch(e => console.error('error: ', e.message))
    await producer.disconnect()
  }
}
