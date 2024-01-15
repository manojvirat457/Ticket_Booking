"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class EventBusService {
    constructor() {
        this.subscribers = {};
    }
    subscribe(eventName, handler) {
        if (!this.subscribers[eventName]) {
            this.subscribers[eventName] = [];
        }
        this.subscribers[eventName].push(handler);
    }
    publish(eventName, data) {
        const handlers = this.subscribers[eventName];
        if (handlers) {
            handlers.forEach((handler) => {
                handler(data);
            });
        }
    }
}
exports.default = EventBusService;
