"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TicketService = void 0;
const eventConsts_1 = require("../constants/eventConsts");
const serviceExporter_1 = require("../utilities/serviceExporter");
class TicketService {
}
exports.TicketService = TicketService;
TicketService.CreateTicket = (id) => serviceExporter_1.eventBus.publish(eventConsts_1.TICKET_CREATED, { id: id });
