import {Router} from 'express';
import { sample_users } from '../data';
import jwt from 'jsonwebtoken';
import asyncHandler from 'express-async-handler';
import { User, UserModel } from '../models/user.model';
import { HTTP_BAD_REQUEST } from '../constants/https_status';
import bcrypt from 'bcryptjs';


const router = Router();

router.get("/seed", asyncHandler(
    async(req, res) => {
        const UsersCount = await UserModel.countDocuments();
        if(UsersCount > 0) {
            res.send("seed is already done!");
            return;
        }
        await UserModel.create(sample_users);
        res.send("seed is done")
    }
));

router.get("/", asyncHandler (
    async (req, res)=> {
        const usersCount = await UserModel.countDocuments();
        if(usersCount > 0) {
            const users = await UserModel.find();
            res.status(200).send(users);
            return;
        }
        res.status(500).send("No usrs availale in the collection")
}));

router.post("/login", asyncHandler(
    async (req, res) => {
        const {email, password} = req.body;
        let user = await UserModel.findOne({email, password});
        if(user) {
            res.send(generateJsonWebToken(user));
        } else {
            res.status(HTTP_BAD_REQUEST).send('Username or password is invalid');
        }
    }
));

router.post("/register", asyncHandler(
    async (req, res) => {
        let { name, userName, email, password, isAdmin } = req.body;
        const user = await UserModel.findOne({email});

        if(user) {
            res.status(HTTP_BAD_REQUEST).send('User already exists, please login');
        } 

        const encryptedPassword = await bcrypt.hash(password, 10);

        const newUser:User = {
            id:'',
            name,
            userName,
            email: email.toLowerCase(),
            password: encryptedPassword,
            isAdmin
        }

        const dbUser = await UserModel.create(newUser);

        res.send(generateJsonWebToken(dbUser))

        }
))

const generateJsonWebToken = (user: any) => {
    const token = jwt.sign({
        email:user.email, isAdmin: user.isAdmin
    }, "12345", {expiresIn: "30d"});

    user.token = token;
    return user;
}

export default router;
