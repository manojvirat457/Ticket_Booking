import express, { Router, Request, Response } from 'express';
import { failed, ok } from '../utilities/response';
import User from '../models/user';
import { UserService } from '../services/userService';

const usersRouter: Router = express.Router();

usersRouter.post('/create', async (req: Request, res: Response) => {
    try {
        let { fullName, email, age, phone } = req.body;
        let user: User = new User();
        user.fullName = fullName;
        user.email = email;
        user.age = age;
        user.phone = phone;

        ok(res, await UserService.createUser(user));

    } catch (error) {
        failed(res, error)
    }
});

usersRouter.get('/all', async (req: Request, res: Response) => {
    try {

        ok(res, await UserService.getAllUser());

    } catch (error) {
        failed(res, error)
    }
});

export default usersRouter;
