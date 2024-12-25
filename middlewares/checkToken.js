import { findUserById } from '../services/userServices.js';
import jwt from 'jsonwebtoken';

const checkToken = async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization) {
        res.status(401).json({ message: 'No authorization!' });
        return;
    }
    const [bearer, token] = authorization.split(' ');

    if (bearer !== 'Bearer' || !token) {
        res.status(401).json({ massage: 'Invalid token format' });
        return;
    }
    try {
        const { id } = jwt.verify(token, process.env.SECRET_KEY);

        const user = await findUserById(id);
        req.user = user;
        next();
    } catch (err) {
        res.status(401).json({ message: 'No authorization!' });
        return;
    }
};

export default checkToken;
