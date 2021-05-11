"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionService = void 0;
class SubscriptionService {
    constructor(repository) {
        this.repository = repository;
    }
    async create(subscription) {
        return await this.repository.create(subscription);
    }
    async get() {
        return await this.repository.get();
    }
}
exports.SubscriptionService = SubscriptionService;
//# sourceMappingURL=subscription-service.js.map