'use strict';

const config = require('config');

class KafkaProducer {

  constructor(){}

  async send(message) {

    const properties = {
      clientId: config.get('CLIENT_ID'), 
      brokers: config.get('BROKERS'),
      topic: config.get('TOPIC'),
    }

    const { Kafka } = require('kafkajs')

    const kafka = new Kafka({
      clientId: properties.clientId,
      brokers: [properties.brokers]
    })

    const producer = kafka.producer()

    await producer.connect()

    await producer.send({
      topic: properties.topic,
      messages: [
        { value: message },
      ],
    }).then(console.log)
    .catch(e => console.error("error: ", e.message))

    await producer.disconnect()

  }

}
module.exports = KafkaProducer; 
