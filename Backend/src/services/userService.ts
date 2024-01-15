import { USER_CREATED } from "../constants/eventConsts";
import User from "../models/user";
import { eventBus } from "../utilities/serviceExporter";

export class UserService {
    static createUser = async (user: User) => {
        try {
            const response: User = await user.save();
            eventBus.publish(USER_CREATED, response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    static getAllUser = async () => {
        try {
            return await User.findAndCount();
        } catch (error) {
            throw error;
        }
    }

    static checkForValidUser = async (userId: number) => {
        return await User.findOne({ where: { id: userId } });
    }

    static saveUserFromObject = async (userDetails: any) => {
        let userData = new User();

            userData.age = userDetails["age"]
            userData.fullName = userDetails["fullName"]
            userData.email = userDetails["email"]
            userData.phone = userDetails["phone"]

            return await this.createUser(userData);
    }

    getAllTicketsForUser = async (id: number) => {
        try {
            return await User.find({ select: ["booking"], where: { id } });
        } catch (error) {
            throw error;
        }
    }
}