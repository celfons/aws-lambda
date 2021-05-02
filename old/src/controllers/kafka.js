'use strict';

const KafkaProducer = require('../integration/producer.js');

module.exports = app => {

    app.get('/kafka', (req, res) => {
        const producer = new KafkaProducer({})
        let message = "Kafka UP!"
        producer.send(message)
        res.status(200).send({value: message});
    });

};
