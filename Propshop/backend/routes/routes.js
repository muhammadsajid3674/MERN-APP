import { Router } from "express"
import authMiddleware from "../middleware/auth.js";
import authRouter from "./auth.js";

const Routes = () => {
    const router = Router();
    router.use('/auth', authMiddleware.authorize, authRouter)
    return router;
}

export default Routes