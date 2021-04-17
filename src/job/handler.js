'use strict';

const repository = require('../repository/dynamodb.js');
const KafkaProducer = require('../integration/producer.js');

module.exports.run = async () => {   
    const producer = new KafkaProducer({})
    const subscriptions = await repository.scan().exec();
    let event = JSON.stringify(subscriptions)
    console.log(event)
    producer.send(event)
  };
