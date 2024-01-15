import express, { Router, Request, Response } from 'express';
import { failed, ok } from '../utilities/response';
import Bus from '../models/bus';
const busRouter: Router = express.Router();

busRouter.get("/all", async (req: Request, res: Response) => {
    try {
        ok(res, await Bus.find());
    } catch (error) {
        failed(res, error)
    }
})

busRouter.post("/create", async (req: Request, res: Response) => {
    try {
        const { busNo } = req.body;

        // Check if the bus number is unique
        const existingBus = await Bus.findOne({ where: { bus_no: busNo } });

        if (existingBus) {
            return res.status(400).json({ error: 'Bus number already exists' });
        }

        // Create a new bus
        const newBus = new Bus();
        newBus.bus_no = busNo;

        // Save the bus
        const savedBus = await Bus.save(newBus);

        res.status(201).json(savedBus);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }

});
export default busRouter;