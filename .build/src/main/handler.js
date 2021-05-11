"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const subscription_job_1 = require("../presentation/job/subscription-job");
const subscription_kafka_1 = require("../infra/kafka/subscription-kafka");
const subscription_dynamodb_1 = require("../infra/db/dynamodb/subscription-dynamodb");
const subscription_service_1 = require("../service/subscription-service");
const subscription_queue_service_1 = require("../service/subscription-queue-service");
const express_1 = require("express");
const serverless_http_1 = __importDefault(require("serverless-http"));
const subscription_controller_factory_1 = require("./factory/subscription-controller-factory");
module.exports.api = async () => {
    const router = express_1.Router();
    const controller = subscription_controller_factory_1.makeSubscriptionController();
    router.post('/subscriptions', function (request, response) {
        response.send(controller.create(request));
    });
    router.get('/subscriptions', function (request, response) {
        response.send(controller.get());
    });
    serverless_http_1.default(router);
};
module.exports.run = async () => {
    const producer = new subscription_kafka_1.SubscriptionKafkaQueue();
    const repository = new subscription_dynamodb_1.SubscriptionRepository();
    const queue = new subscription_queue_service_1.SubscriptionQueueService(producer);
    const service = new subscription_service_1.SubscriptionService(repository);
    const job = new subscription_job_1.SubscriptionJob(queue, service);
    await job.run();
};
//# sourceMappingURL=handler.js.map