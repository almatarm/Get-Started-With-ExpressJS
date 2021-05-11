import * as mongoose from 'mongoose';
import User from './user';

const userSchema = new mongoose.Schema(
    {
        username: { type: String, required: true },
        password: { type: String },
        email: { type: String },
        name: { type: String },
        photo: { type: String },
    },
    {
        timestamps: {},
    },
);

const userModel = mongoose.model<User & mongoose.Document>('User', userSchema);

export default userModel;