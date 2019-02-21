import * as express from "express";
import authMiddleware from "./auth.middleware";

const router: any = express.Router();

//login router
router.post('/token', authMiddleware.generateToken);

export default router;