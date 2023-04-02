
import { Router } from "express";
import { contactUsMessage } from "../controller/contact.js";

const router = Router();

export default router.post("/contact-message", contactUsMessage);