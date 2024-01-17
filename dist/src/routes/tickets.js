"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const booking_1 = __importDefault(require("../models/booking"));
const user_1 = __importDefault(require("../models/user"));
const bus_1 = __importDefault(require("../models/bus"));
const bookingEnum_1 = __importDefault(require("../enums/bookingEnum"));
const response_1 = require("../utilities/response");
const serviceExporter_1 = require("../utilities/serviceExporter");
const eventConsts_1 = require("../constants/eventConsts");
const userService_1 = require("../services/userService");
const ticketService_1 = require("../services/ticketService");
const ticketsRouter = express_1.default.Router();
ticketsRouter.get("/all", async (req, res) => {
    try {
        (0, response_1.ok)(res, await ticketService_1.TicketService.GetAllTickets());
    }
    catch (error) {
        (0, response_1.failed)(res, error);
    }
});
ticketsRouter.post('/book', async (req, res) => {
    try {
        let { seatNo, userId, busId, userDetails } = req.body;
        // Check if the seat is available
        const existingBooking = await booking_1.default.findOne({ where: { seat_no: seatNo, bus: busId } });
        if (existingBooking) {
            return res.status(400).json({ error: 'Seat already booked' });
        }
        // Retrieve the user
        let user = await userService_1.UserService.checkForValidUser(userId);
        if (!user && !userDetails) {
            return res.status(404).json({ error: 'User not found' });
        }
        else {
            let userData = new user_1.default();
            if (!userDetails)
                return res.status(404).json({ error: 'User not found' });
            userData.age = userDetails["age"];
            userData.fullName = userDetails["fullName"];
            userData.email = userDetails["email"];
            userData.phone = userDetails["phone"];
            user = await userService_1.UserService.createUser(userData);
        }
        // Retrieve the bus
        const bus = await bus_1.default.findOne({ where: { id: busId } });
        if (!bus) {
            return res.status(404).json({ error: 'Bus not found' });
        }
        // Create a new booking
        const newBooking = new booking_1.default();
        newBooking.seat_no = seatNo;
        newBooking.user = user;
        newBooking.bus = bus;
        // Save the booking
        const savedBooking = await booking_1.default.save(newBooking);
        serviceExporter_1.eventBus.publish(eventConsts_1.TICKET_CREATED, savedBooking);
        res.status(201).json(savedBooking);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
ticketsRouter.get('/cancel/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        // Find the booking by ID
        const booking = await booking_1.default.findOne({ where: { id: bookingId } });
        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // Check if the booking is in a cancellable state (e.g., not already canceled or completed)
        if (booking.status === bookingEnum_1.default.CANCELED || booking.status !== bookingEnum_1.default.CONFIRMED) {
            return res.status(400).json({ message: 'Booking cannot be canceled' });
        }
        // Update the booking status to 'canceled'
        booking.status = bookingEnum_1.default.CANCELED;
        await booking.save();
        return res.status(200).json({ message: 'Booking canceled successfully' });
    }
    catch (error) {
        console.error('Error canceling booking:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
ticketsRouter.get('/status/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        // Find the booking by ID
        const booking = await booking_1.default.findOne({ where: { id: bookingId } });
        // Check if the booking exists
        if (!booking) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // Return the booking status
        return res.status(200).json({ status: booking.status });
    }
    catch (error) {
        console.error('Error fetching booking status:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
ticketsRouter.get('/open', async (_, res) => {
    try {
        // Find all open bookings
        const openBookings = await booking_1.default.find({
            where: {
                status: bookingEnum_1.default.PENDING || bookingEnum_1.default.CANCELED || bookingEnum_1.default.OPEN, // Assuming 'PENDING' represents an open ticket status
            },
        });
        // Return the list of open bookings
        return res.status(200).json(openBookings);
    }
    catch (error) {
        console.error('Error fetching open tickets:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
ticketsRouter.get('/owner/:bookingId', async (req, res) => {
    const { bookingId } = req.params;
    try {
        // Find the booking by ID with its associated user details
        const bookingWithOwnerDetails = await booking_1.default.findOne({
            relations: ['user'], // Specify the relation to the 'user' property in the Booking entity
            where: { id: bookingId },
        });
        // Check if the booking exists
        if (!bookingWithOwnerDetails) {
            return res.status(404).json({ message: 'Booking not found' });
        }
        // Extract owner details from the booking
        const ownerDetails = Object.assign({}, bookingWithOwnerDetails.user);
        // Return the details of the person owning the ticket
        return res.status(200).json(ownerDetails);
    }
    catch (error) {
        console.error('Error fetching owner details:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
ticketsRouter.post('/reset/:busId', async (req, res) => {
    try {
        let { busId } = req.params;
        let { userName, password } = req.headers;
        if (userName == 'admin' && password == 'Admin@123') {
            // Update the status of all tickets to 'open' (or the desired initial status)
            await booking_1.default.update({}, { status: bookingEnum_1.default.OPEN, bus: { id: busId } });
            return res.status(200).json({ message: 'Server reset successful' });
        }
        return res.status(500).json({ message: 'Invalid Admin Credentials' });
    }
    catch (error) {
        console.error('Error resetting server:', error);
        return res.status(500).json({ message: 'Internal server error' });
    }
});
exports.default = ticketsRouter;
