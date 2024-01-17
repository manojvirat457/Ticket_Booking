"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const eventConsts_1 = require("../constants/eventConsts");
const booking_1 = __importDefault(require("../models/booking"));
const serviceExporter_1 = require("../utilities/serviceExporter");
class TicketService {
}
exports.TicketService = TicketService;
_a = TicketService;
TicketService.CreateTicket = (id) => serviceExporter_1.eventBus.publish(eventConsts_1.TICKET_CREATED, { id: id });
TicketService.GetAllTickets = async () => await booking_1.default.find({ relations: ['user', 'bus'] });
