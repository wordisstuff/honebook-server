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
        res.status(401).json({ massage: c });
        return;
    }
    const { SECRET_KEY } = process.env;
    const { id } = jwt.verify(token, SECRET_KEY);

    const user = await findUserById(id);

    if (!user || !user.token || user.token !== token) {
        res.status(401).json({ message: 'No authorization!' });
        return;
    }
    req.user = user;
    next();
};

export default checkToken;
