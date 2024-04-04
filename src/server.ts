import dotenv from 'dotenv';
dotenv.config();
import { dbConnnect } from './configs/database.config';
dbConnnect()
import express from "express";
import cors from "cors";
import { sample_users } from "./data";
import jwt from 'jsonwebtoken';
import usrRouter from './routers/user.router';


const app = express();
app.use(express.json())
app.use(cors({
    credentials: true,
    origin:["http://localhost:4200"]
}));

app.use("/api/users", usrRouter)




const port = 5000
app.listen(port, () => {
    console.log("server is running on http://localhost:" + port);
})