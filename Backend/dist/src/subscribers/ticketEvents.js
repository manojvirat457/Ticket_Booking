"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const bookingEnum_1 = __importDefault(require("../enums/bookingEnum"));
const booking_1 = __importDefault(require("../models/booking"));
class TicketEvents {
    constructor({ eventBusService }) {
        this.ticketCreated = async (ticket) => {
            const booking = await booking_1.default.findOne({ where: { seat_no: ticket.seat_no, bus: ticket.bus } });
            if (!booking)
                return;
            booking.status = bookingEnum_1.default.CONFIRMED;
            await booking_1.default.save(booking);
        };
        eventBusService.subscribe('ticket.created', this.ticketCreated);
    }
}
exports.default = TicketEvents;
