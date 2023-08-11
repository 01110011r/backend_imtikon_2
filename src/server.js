import express from "express";
import "dotenv/config";
import { userRouter } from "./routes/main.routes.js";
import { authRouter } from "./routes/auth.routes.js";



function main() {
    const app=express();
    app.use(express.json());
    app.use(userRouter);
    app.use(authRouter);
    app.listen(process.env.PORT, process.env.HOST, ()=>console.log(process.env.PORT+' done.'))
}
main();