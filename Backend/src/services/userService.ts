import { USER_CREATED } from "../constants/eventConsts";
import User from "../models/user";
import { eventBus } from "../utilities/serviceExporter";

export class UserService {
    createUser = async (user: User) => {
        try {
            const response: User = await user.save();
            eventBus.publish(USER_CREATED, response);
            return response;
        } catch (error) {
            throw error;
        }
    }

    getAllTicketsForUser = async (id: number) => {
        try {
            return await User.find({ select: ["booking"], where: { id } });
        } catch (error) {
            throw error;
        }
    }
}