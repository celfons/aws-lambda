"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SubscriptionSchema = exports.SubscriptionDocument = void 0;
const Schema_1 = require("dynamoose/dist/Schema");
class SubscriptionDocument {
    constructor(id, customerId, offerId, startDate, duration, period) {
        this.id = id;
        this.customerId = customerId;
        this.offerId = offerId;
        this.startDate = startDate;
        this.duration = duration;
        this.period = period;
    }
}
exports.SubscriptionDocument = SubscriptionDocument;
exports.SubscriptionSchema = {
    getSchema() {
        return new Schema_1.Schema({
            id: String,
            customerId: String,
            offerId: String,
            startDate: String,
            duration: String,
            period: String
        });
    }
};
//# sourceMappingURL=subscription-document.js.map