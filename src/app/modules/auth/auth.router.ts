import * as express from "express";
import controller from "./auth.controller";

const router: express.Router = express.Router();

router.post('/token', controller.generateToken);
router.post('/forgot-password', controller.forgotPassword);
router.post('/reset-password', controller.resetPassword);

export default router;