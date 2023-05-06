

import { Router } from "express";
import { createTransaction, getOneTransaction } from "../controller/transactions.js";
import { trackPaystackEvent } from "../controller/paymentWebhook.js";

const router = Router();

 router.post("/create", createTransaction);
 router.get("/user/:email", createTransaction);
 router.post("/paystack-webhook", trackPaystackEvent);
 
 export default router;