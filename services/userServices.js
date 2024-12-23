import User from '../db/models/User.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export const findUserByEmail = email => User.findOne({ email });
export const findUserById = id => User.findById(id);

export const updateUserWithToket = id => {
    const { SECRET_KEY } = process.env;
    const token = jwt.sign({ id }, SECRET_KEY);
    return User.findByIdAndUpdate(id, { token }, { new: true });
};

export const createUser = async userData => {
    const hashedPassword = await bcrypt.hash(userData.password, 10);

    const user = await User.create({ ...userData, password: hashedPassword });
    return updateUserWithToket(user._id);
};

export const resetToken = async id => {
    await User.findByIdAndUpdate(id, { token: '' });
};

export const updateUserWithAvatar = async (id, avatar) => {
    return User.findByIdAndUpdate(id, { avatar }, { new: true });
};

export const updatePassword = async (id, password) => {
    const newPassword = await bcrypt.hash(password, 10);
    return User.findByIdAndUpdate(id, { password: newPassword }, { new: true });
};
