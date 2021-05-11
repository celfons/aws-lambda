"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionRepository = void 0;
const dynamoose = __importStar(require("dynamoose"));
const helpper_1 = require("./helpper");
const subscription_document_1 = require("../dynamodb/documents/subscription-document");
const uuid_1 = require("uuid");
class SubscriptionRepository {
    async create(subscription) {
        try {
            await helpper_1.DynamoHelper.connect();
            const Model = dynamoose.model('Subscriptions', subscription_document_1.SubscriptionSchema.getSchema());
            const document = new subscription_document_1.SubscriptionDocument(uuid_1.v4(), subscription.customerId, subscription.offerId, subscription.startDate, subscription.duration, subscription.period);
            const model = new Model(document);
            await model.save();
            return await new Promise(resolve => resolve(document));
        }
        catch (error) {
            return error;
        }
    }
    async get() {
        await helpper_1.DynamoHelper.connect();
        const Model = dynamoose.model('Subscriptions', subscription_document_1.SubscriptionSchema.getSchema());
        const subscriptions = await Model.scan().exec();
        const result = [];
        if (subscriptions.count !== 0) {
            subscriptions.forEach((item, index, arr) => {
                result.push(arr[index]);
            });
        }
        return new Promise(resolve => resolve(result));
    }
}
exports.SubscriptionRepository = SubscriptionRepository;
//# sourceMappingURL=subscription-dynamodb.js.map