import * as express from "express";
import apiRouter from "./api";
import authRouter from "../modules/auth/auth.router";
import authMiddleware from "../modules/auth/auth.middleware";

const router: express.Router = express.Router();

router.all('/', (req: any, res: any) => {
    res.send('WELLCOME TO NODE API');
});


router.use('/auth', authRouter);
router.use('/api', authMiddleware.auth, apiRouter);

export default router;
