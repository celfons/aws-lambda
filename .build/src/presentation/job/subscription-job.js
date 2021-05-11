"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionJob = void 0;
class SubscriptionJob {
    constructor(queue, service) {
        this.queue = queue;
        this.service = service;
    }
    async run() {
        const message = await this.service.get();
        await this.queue.send(message);
    }
}
exports.SubscriptionJob = SubscriptionJob;
//# sourceMappingURL=subscription-job.js.map