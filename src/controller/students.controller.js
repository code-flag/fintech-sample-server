import { NotFoundError } from "../helpers/error.js";
import { getAllStudentInfo, getOneStudentInfo } from "../models/queries/student-data.query.js";

export const getStudentsData = async (req, res) => {
    const userData = await getAllStudentInfo();

    if (userData) {
        res.status(200).json({
            status: "success",
            message: "Students data retrieved successfully",
            data: userData
        })
    }
    else {
        // throw new NotFoundError("No students found")
        res.status(400).json({
            status: "success",
            message: "no students yet",
            data: userData
        })
    }
   
}

export const getOneStudentData = async (req, res) => {
    const email = req.params.email;
    const userData = await getOneStudentInfo(email);

    if (userData) {
        res.status(200).json({
            status: "success",
            message: "Students data retrieved successfully",
            data: userData
        })
    }
    else {
        // throw new NotFoundError("Student not found");
        res.status(400).json({
            status: "failed",
            message: "Students not found",
            data: userData
        })
    }
}