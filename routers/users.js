import { Router } from 'express';
import signupUsersSchema from '../schemas/users/signup.js';
import { validateBody } from '../utils/validateBody.js';
import {
    changePassword,
    currentController,
    loginController,
    logoutControler,
    signupController,
    updateAvatarController,
} from '../controllers/usersController.js';
import { ctrlWraper } from '../utils/ctrlWraper.js';
import loginUserSchema from '../schemas/users/login.js';
import checkToken from '../middlewares/checkToken.js';
import upload from '../middlewares/upload.js';
import changePwd from '../schemas/users/changePwd.js';

const userRouter = Router();

userRouter.post(
    '/signup',
    validateBody(signupUsersSchema),
    ctrlWraper(signupController),
);
userRouter.post(
    '/login',
    validateBody(loginUserSchema),
    ctrlWraper(loginController),
);
userRouter.post('/logout', checkToken, ctrlWraper(logoutControler));
userRouter.get('/current', checkToken, ctrlWraper(currentController));

userRouter.patch(
    '/avatar',
    checkToken,
    upload.single('avatar'),
    ctrlWraper(updateAvatarController),
);

userRouter.patch(
    '/change-pwd',
    checkToken,
    validateBody(changePwd),
    ctrlWraper(changePassword),
);

export default userRouter;
