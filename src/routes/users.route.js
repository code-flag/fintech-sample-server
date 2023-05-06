

import { Router } from "express";
import { getOneUserData, getUsersData, loginUser, signUpUser } from "../controller/users.controller.js";

const router = Router();

 router.post("/create-user", signUpUser);
 router.post("/login", loginUser);
 router.get("/one/:email", getOneUserData);
 router.get("/all", getUsersData);
 
 export default router;