"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.failed = exports.ok = void 0;
class Success {
    constructor(data) {
        this.data = data;
        this.success = true;
    }
}
class Failure {
    constructor(error) {
        this.error = error;
        this.success = false;
    }
}
function ok(res, data) {
    res.status(200).json(new Success(data));
}
exports.ok = ok;
function failed(res, error) {
    res.status(500).json(new Failure(error));
}
exports.failed = failed;
