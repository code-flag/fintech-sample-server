
import { Router } from "express";
import contactRoute from "./contact.route.js";
import paymentRoute from "./payment.route.js";
import studentRoute from "./students.route.js";


const router = Router();

router.use("/payment", paymentRoute);
router.use("/contact", contactRoute);
router.use("/student", studentRoute);

export default router;