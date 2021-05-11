"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionController = void 0;
const _http_helper_1 = require("./helpers/ http-helper");
class SubscriptionController {
    constructor(service) {
        this.service = service;
    }
    async create(httpRequest) {
        try {
            const { customerId, offerId, startDate, duration, period } = httpRequest.body;
            const subscription = await this.service.create({
                customerId,
                offerId,
                startDate,
                duration,
                period
            });
            return _http_helper_1.ok(subscription);
        }
        catch (error) {
            return _http_helper_1.serverError();
        }
    }
    async get() {
        try {
            const subscription = await this.service.get();
            return _http_helper_1.ok(subscription);
        }
        catch (error) {
            return _http_helper_1.serverError();
        }
    }
}
exports.SubscriptionController = SubscriptionController;
//# sourceMappingURL=subscription-controller.js.map