"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.makeSubscriptionController = void 0;
const subscription_controller_1 = require("../../presentation/controller/subscription-controller");
const subscription_service_1 = require("../../service/subscription-service");
const subscription_dynamodb_1 = require("../../infra/db/dynamodb/subscription-dynamodb");
const makeSubscriptionController = () => {
    const repository = new subscription_dynamodb_1.SubscriptionRepository();
    const service = new subscription_service_1.SubscriptionService(repository);
    return new subscription_controller_1.SubscriptionController(service);
};
exports.makeSubscriptionController = makeSubscriptionController;
//# sourceMappingURL=subscription-controller-factory.js.map