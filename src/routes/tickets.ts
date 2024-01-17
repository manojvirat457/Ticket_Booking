import express, { Router, Request, Response } from 'express';
import { getRepository } from 'typeorm';
import Booking from '../models/booking';
import User from '../models/user';
import Bus from '../models/bus';
import BookingStatus from '../enums/bookingEnum';
import { failed, ok } from '../utilities/response';
import { eventBus } from '../utilities/serviceExporter';
import { TICKET_CREATED } from '../constants/eventConsts';
import { UserService } from '../services/userService';
import { TicketService } from '../services/ticketService';

const ticketsRouter: Router = express.Router();

ticketsRouter.get("/all", async (req: Request, res: Response) => {
    try {
        ok(res, await TicketService.GetAllTickets());
    } catch (error) {
        failed(res, error)
    }
})

ticketsRouter.post('/book', async (req: Request, res: Response) => {
    try {
        let { seatNo, userId, busId, userDetails } = req.body;

        // Check if the seat is available
        const existingBooking = await Booking.findOne({ where: { seat_no: seatNo, bus: busId } });

        if (existingBooking) {
            return res.status(400).json({ error: 'Seat already booked' });
        }

        // Retrieve the user
        let user = await UserService.checkForValidUser(userId);

        if (!user && !userDetails) {
            return res.status(404).json({ error: 'User not found' });
        } else {
            let userData = new User();

            if (!userDetails) return res.status(404).json({ error: 'User not found' });

            userData.age = userDetails["age"]
            userData.fullName = userDetails["fullName"]
            userData.email = userDetails["email"]
            userData.phone = userDetails["phone"]

            user = await UserService.createUser(userData);
        }

        // Retrieve the bus
        const bus = await Bus.findOne({ where: { id: busId } });

        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }

        // Create a new booking
        const newBooking = new Booking();
        newBooking.seat_no = seatNo;
        newBooking.user = user;
        newBooking.bus = bus;

        // Save the booking
        const savedBooking = await Booking.save(newBooking);

        eventBus.publish(TICKET_CREATED, savedBooking);

        res.status(201).json(savedBooking);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});

ticketsRouter.get('/cancel/:bookingId', async (req: Request, res: Response) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID
        const booking = await Booking.findOne({ where: { id: bookingId } });

        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Check if the booking is in a cancellable state (e.g., not already canceled or completed)
        if (booking.status === BookingStatus.CANCELED || booking.status !== BookingStatus.CONFIRMED) {
            return res.status(400).json({ message: 'Booking cannot be canceled' });
        }

        // Update the booking status to 'canceled'
        booking.status = BookingStatus.CANCELED;
        await booking.save();

        return res.status(200).json({ message: 'Booking canceled successfully' });
    } catch (error) {
        console.error('Error canceling booking:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

ticketsRouter.get('/status/:bookingId', async (req: Request, res: Response) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID
        const booking = await Booking.findOne({ where: { id: bookingId } });

        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Return the booking status
        return res.status(200).json({ status: booking.status });
    } catch (error) {
        console.error('Error fetching booking status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

ticketsRouter.get('/open', async (_, res: Response) => {
    try {
        // Find all open bookings
        const openBookings = await Booking.find({
            where: {
                status: BookingStatus.PENDING || BookingStatus.CANCELED || BookingStatus.OPEN, // Assuming 'PENDING' represents an open ticket status
            },
        });

        // Return the list of open bookings
        return res.status(200).json(openBookings);
    } catch (error) {
        console.error('Error fetching open tickets:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

ticketsRouter.get('/owner/:bookingId', async (req: Request, res: Response) => {
    const { bookingId } = req.params;

    try {
        // Find the booking by ID with its associated user details
        const bookingWithOwnerDetails = await Booking.findOne({
            relations: ['user'], // Specify the relation to the 'user' property in the Booking entity
            where: { id: bookingId },
        });

        // Check if the booking exists
        if (!bookingWithOwnerDetails) {
            return res.status(404).json({ message: 'Booking not found' });
        }

        // Extract owner details from the booking
        const ownerDetails = {
            ...bookingWithOwnerDetails.user
        };

        // Return the details of the person owning the ticket
        return res.status(200).json(ownerDetails);
    } catch (error) {
        console.error('Error fetching owner details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

ticketsRouter.post('/reset/:busId', async (req: Request, res: Response) => {
    try {
        let { busId } = req.params;

        let { userName, password } = req.headers;

        if (userName == 'admin' && password == 'Admin@123') {
            // Update the status of all tickets to 'open' (or the desired initial status)
            await Booking.update({}, { status: BookingStatus.OPEN, bus: { id: busId } });

            return res.status(200).json({ message: 'Server reset successful' });
        }

        return res.status(500).json({ message: 'Invalid Admin Credentials' });
    } catch (error) {
        console.error('Error resetting server:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});

export default ticketsRouter;
