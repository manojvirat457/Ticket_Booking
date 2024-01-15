"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const response_1 = require("../utilities/response");
const user_1 = __importDefault(require("../models/user"));
const userService_1 = require("../services/userService");
const usersRouter = express_1.default.Router();
usersRouter.post('/create', async (req, res) => {
    try {
        let { fullName, email, age, phone } = req.body;
        let user = new user_1.default();
        user.fullName = fullName;
        user.email = email;
        user.age = age;
        user.phone = phone;
        (0, response_1.ok)(res, await userService_1.UserService.createUser(user));
    }
    catch (error) {
        (0, response_1.failed)(res, error);
    }
});
usersRouter.get('/all', async (req, res) => {
    try {
        (0, response_1.ok)(res, await userService_1.UserService.getAllUser());
    }
    catch (error) {
        (0, response_1.failed)(res, error);
    }
});
exports.default = usersRouter;
