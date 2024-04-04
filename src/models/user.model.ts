import {Schema, model} from 'mongoose'

export interface User {
    id: string;
    name: string;
    userName: string;
    email: string;
    password: string;
    isAdmin: string;
}

export const UserSchema = new Schema<User>({
    name: {type: String, required: true},
    userName: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    isAdmin: {type: String, required: true}
}, {
    timestamps: true,
    toJSON: {
        virtuals: true
    },
    toObject: {
        virtuals: true
    }
});


export const UserModel = model<User>('user', UserSchema)