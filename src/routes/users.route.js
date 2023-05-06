

import { Router } from "express";
import { getOneStudentData, getStudentsData } from "../controller/users.controller.js";

const router = Router();

 router.get("/one/:email", getOneStudentData);
 router.get("/all", getStudentsData);
 
 export default router;