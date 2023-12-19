import { Router } from "express"
import authMiddleware from "../middleware/auth.js";
import authRouter from "./auth.js";
import productRouter from "./product.js";
import userRouter from "./user.js";
import orderRouter from "./order.js";

const Routes = () => {
    const router = Router();
    router.use('/auth', authMiddleware.authorize, authRouter);
    router.use('/product', productRouter);
    router.use('/user', userRouter);
    router.use('/order', orderRouter);
    router.get('/api/config/paypal', authMiddleware.authorize, (req, res) => res.send(process.env.PAYPAL_CLIENT_ID));
    return router;
}

export default Routes