"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
// src/ServiceContainer.ts
const eventServiceBus_1 = __importDefault(require("../events/eventServiceBus"));
const ticketEvents_1 = __importDefault(require("../../subscribers/ticketEvents"));
class ServiceContainer {
    static init() {
        this.getEventBusService();
        this.LoadTicketEvents();
    }
}
_a = ServiceContainer;
ServiceContainer.getEventBusService = () => {
    var _b;
    return (_a.eventBusServiceInstance = (_b = _a.eventBusServiceInstance) !== null && _b !== void 0 ? _b : new eventServiceBus_1.default());
};
ServiceContainer.LoadTicketEvents = () => {
    var _b;
    return (_a.TicketEventsInstance = (_b = _a.TicketEventsInstance) !== null && _b !== void 0 ? _b : new ticketEvents_1.default({ eventBusService: _a.getEventBusService() }));
};
exports.default = ServiceContainer;
