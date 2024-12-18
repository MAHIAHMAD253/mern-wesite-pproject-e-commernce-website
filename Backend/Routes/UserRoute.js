import express from 'express';
import {loginUser, registerUsr, adminLogin } from '../controller/UserController.js';

const userRouter = express.Router();


userRouter.post('/register',registerUsr)
userRouter.post('/login', loginUser)
userRouter.post('/admin',adminLogin )

export default userRouter;

