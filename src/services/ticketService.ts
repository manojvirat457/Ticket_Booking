import { TICKET_CREATED } from "../constants/eventConsts";
import Booking from "../models/booking";
import { eventBus } from "../utilities/serviceExporter";

export class TicketService {

    static CreateTicket = (id: string): void => eventBus.publish(TICKET_CREATED, {id: id}) 

    static GetAllTickets = async (): Promise<Booking[]> => await Booking.find({ relations: ['user', 'bus'] })

}