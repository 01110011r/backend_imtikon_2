import { Router } from "express";
import { productsPost, userAccountGet, userBuyProduct, userGetProductSee, userMoneyAdd } from "../controller/main.controller.js";
import { addProductMiddleware, tokenForMiddleware } from "../middlewares/middleware.js";
export const userRouter=Router();

userRouter.get('/api/products', userGetProductSee).post('/api/products', tokenForMiddleware, addProductMiddleware, productsPost).get('/api/user/account', tokenForMiddleware, userAccountGet).put(`/api/users/:id/account`, tokenForMiddleware, userMoneyAdd).post('/api/products/:id/buy', tokenForMiddleware, userBuyProduct);