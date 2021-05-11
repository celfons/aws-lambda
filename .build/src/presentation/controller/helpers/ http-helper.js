"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ok = exports.serverError = void 0;
const server_error_1 = require("../../errors/server-error");
const serverError = () => ({
    statusCode: 500,
    body: new server_error_1.ServerError()
});
exports.serverError = serverError;
const ok = (data) => ({
    statusCode: 200,
    body: data
});
exports.ok = ok;
//# sourceMappingURL=%20http-helper.js.map