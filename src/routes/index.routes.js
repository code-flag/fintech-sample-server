
import { Router } from "express";
import contactRoute from "./contact.route.js";
import paymentRoute from "./payment.route.js";


const router = Router();

router.use("/payment", paymentRoute);
router.use("/contact", contactRoute);

export default router;