// src/ProductVariantSubscriber.ts
import EventBusService from '../core/events/eventServiceBus';
import BookingStatus from '../enums/bookingEnum';
import Booking from '../models/booking';

class TicketEvents {
    constructor({ eventBusService }: { eventBusService: EventBusService }) {
        eventBusService.subscribe('ticket.created', this.ticketCreated);
    }
    ticketCreated = async (ticket: Booking): Promise<void> => {
        const booking = await Booking.findOne({ where: { seat_no: ticket.seat_no, bus: ticket.bus } });

        if(!booking)  return;

        booking.status = BookingStatus.CONFIRMED;

        await Booking.save(booking);

          
    };
}

export default TicketEvents;
