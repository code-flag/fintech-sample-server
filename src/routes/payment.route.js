

import { Router } from "express";
import { contactUsMessage } from "../controller/contact.js";
import { paymentController } from "../controller/payment.js";
import { trackPaystackEvent } from "../controller/paymentWebhook.js";

const router = Router();

 router.post("/user-payment", paymentController);
 router.post("/paystack-webhook", trackPaystackEvent);
 
 export default router;