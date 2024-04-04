import { connect, ConnectOptions } from 'mongoose';

export const dbConnnect = () => {
    connect(process.env.MONGO_URI!).then(
        () => console.log("connect successfully"),
        (error) => console.log(error)
    )
}