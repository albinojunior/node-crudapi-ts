import * as express from "express";
import usersRouter from "../modules/user/user.router";

const router: express.Router = express.Router();

router.use('/users', usersRouter);

export default router;