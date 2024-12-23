import {
    findUserByEmail,
    createUser,
    resetToken,
    updateUserWithToket,
    updateUserWithAvatar,
    updatePassword,
} from '../services/userServices.js';
import bcrypt from 'bcrypt';
import path from 'node:path';
import fs from 'node:fs/promises';
import gravatar from 'gravatar';

export const signupController = async (req, res, next) => {
    const user = await findUserByEmail(req.body.email);

    if (user) {
        res.status(409).json({
            message: 'User email in use!',
        });
        return;
    }
    const avatarUrl = gravatar.url(req.body.email);

    const { token, name, email, avatar } = await createUser({
        ...req.body,
        avatar: avatarUrl,
    });
    res.status(201).json({ token, user: { email, name, avatar } });
};

export const loginController = async (req, res) => {
    const user = await findUserByEmail(req.body.email);
    if (!user) {
        res.status(401).json({
            message: 'Credentials are wrong!!!',
        });
        return;
    }
    const isPasswordCorect = bcrypt.compare(req.body.password, user.password);
    if (!isPasswordCorect) {
        res.status(401).json({
            message: 'Credentials are wrong!!!',
        });
        return;
    }
    const { token, name, email, avatar } = await updateUserWithToket(user._id);
    res.json({ token, user: { email, name, avatar } });
};

export const logoutControler = async (req, res) => {
    await resetToken(req.user._id);
    res.status(204).end();
};

export const currentController = (req, res) => {
    const { email, name, avatar } = req.user;
    res.status(200).json({ email, name, avatar });
};

export const updateAvatarController = async (req, res) => {
    if (!req.file) {
        res.status(400).json({
            message: 'Bad request!',
        });
        return;
    }
    const { path: tempPath, originalname } = req.file;
    const newName = `${Date.now()}_${originalname}`;

    const avatarPath = path.join(process.cwd(), 'public', 'avatars', newName);

    await fs.rename(tempPath, avatarPath);

    const avatarUrl = path.join('avatars', newName);

    const { email, name, avatar } = await updateUserWithAvatar(
        req.user._id,
        avatarUrl,
    );

    res.status(200).json({ email, name, avatar });
};

export const changePassword = async (req, res) => {
    const { oldPassword, newPassword } = req.body;

    const isPasswordCorect = await bcrypt.compare(
        oldPassword,
        req.user.password,
    );

    if (!isPasswordCorect) {
        res.status(401).json({
            message: 'Wrong current password',
        });
        return;
    }
    await updatePassword(req.user._id, newPassword);

    res.status(204).end();
};
