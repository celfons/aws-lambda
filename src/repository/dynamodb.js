const dynamoose = require('dynamoose');

const uuid = require('uuid');

const config = require('config');

const properties = {
    region: config.get('AWS_REGION'), 
  }

dynamoose.aws.sdk.config.update({region: properties.region,});

dynamoose.aws.ddb.local();

const subscriptions = new dynamoose.Schema({
    id: {type: String,hashKey: true,default: uuid.v1(),},
    name:{type: String,required: true,}
},{timestamps: true,});

module.exports = dynamoose.model('subscriptions', subscriptions);
