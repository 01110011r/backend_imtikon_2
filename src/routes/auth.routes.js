import { Router } from "express";
import { authMiddleware } from "../middlewares/middleware.js";
import { signIn, signUp } from "../controller/auth.controller.js";
export const authRouter=Router();
authRouter.post('/api/signup', authMiddleware, signUp).post('/api/signin', signIn);