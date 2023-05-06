
import { Router } from "express";
import paymentRoute from "./payment.route.js";
import userRoute from "./users.route.js";


const router = Router();

router.use("/txn", paymentRoute);
router.use("/user", userRoute);

export default router;