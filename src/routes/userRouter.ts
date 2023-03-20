import { Router } from "express";
import { UserController } from "../controllers/UserController";

const userRouter = Router();

userRouter.post('/create', new UserController().create);
// userRouter.delete('/delete/:id', new UserController().delete);

export default userRouter;