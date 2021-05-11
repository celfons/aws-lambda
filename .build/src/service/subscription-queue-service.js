"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionQueueService = void 0;
class SubscriptionQueueService {
    constructor(queue) {
        this.queue = queue;
    }
    async send(message) {
        return await this.queue.send(message);
    }
}
exports.SubscriptionQueueService = SubscriptionQueueService;
//# sourceMappingURL=subscription-queue-service.js.map