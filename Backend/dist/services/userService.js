"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const eventConsts_1 = require("../constants/eventConsts");
const user_1 = __importDefault(require("../models/user"));
const serviceExporter_1 = require("../utilities/serviceExporter");
class UserService {
    constructor() {
        this.getAllTicketsForUser = async (id) => {
            try {
                return await user_1.default.find({ select: ["booking"], where: { id } });
            }
            catch (error) {
                throw error;
            }
        };
    }
}
exports.UserService = UserService;
_a = UserService;
UserService.createUser = async (user) => {
    try {
        const response = await user.save();
        serviceExporter_1.eventBus.publish(eventConsts_1.USER_CREATED, response);
        return response;
    }
    catch (error) {
        throw error;
    }
};
UserService.getAllUser = async () => {
    try {
        return await user_1.default.findAndCount();
    }
    catch (error) {
        throw error;
    }
};
UserService.checkForValidUser = async (userId) => {
    return await user_1.default.findOne({ where: { id: userId } });
};
UserService.saveUserFromObject = async (userDetails) => {
    let userData = new user_1.default();
    userData.age = userDetails["age"];
    userData.fullName = userDetails["fullName"];
    userData.email = userDetails["email"];
    userData.phone = userDetails["phone"];
    return await _a.createUser(userData);
};
