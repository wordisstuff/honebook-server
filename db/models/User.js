import { model, Schema } from 'mongoose';

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        token: { type: String },
        avatar: { type: String },
    },
    { versionKey: false },
);

const User = model('user', userSchema);

export default User;
