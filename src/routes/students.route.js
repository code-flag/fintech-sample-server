

import { Router } from "express";
import { getOneStudentData, getStudentsData } from "../controller/students.controller.js";

const router = Router();

 router.get("/:email", getOneStudentData);
 router.get("/", getStudentsData);
 
 export default router;