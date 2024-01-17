"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = require("../utilities/response");
const bus_1 = __importDefault(require("../models/bus"));
const busRouter = express_1.default.Router();
busRouter.get("/all", async (req, res) => {
    try {
        (0, response_1.ok)(res, await bus_1.default.find());
    }
    catch (error) {
        (0, response_1.failed)(res, error);
    }
});
busRouter.post("/create", async (req, res) => {
    try {
        const { busNo } = req.body;
        // Check if the bus number is unique
        const existingBus = await bus_1.default.findOne({ where: { bus_no: busNo } });
        if (existingBus) {
            return res.status(400).json({ error: 'Bus number already exists' });
        }
        // Create a new bus
        const newBus = new bus_1.default();
        newBus.bus_no = busNo;
        // Save the bus
        const savedBus = await bus_1.default.save(newBus);
        res.status(201).json(savedBus);
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
});
exports.default = busRouter;
