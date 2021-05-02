'use strict';

const repository = require('../repository/dynamodb.js');

module.exports = app => {

    app.get('/subscriptions', async(req, res) => {
        const subscriptions = await repository.scan().exec();
        return res.json({subscriptions});
    });
    
    app.post('/subscriptions', async(req, res) => {
        const subscriptions = await repository.create(req.body);
        return res.json(subscriptions);
    });
    
    app.put('/subscriptions/:id', async(req, res) => {
        const subscriptions = await repository.update(req.params.id,req.body);
        return res.json(subscriptions);
    });
    
    app.delete('/subscriptions/:id', async(req, res) => {
        await repository.delete(req.params.id);
        return res.json({msg: 'Deleted'});
    });

};
