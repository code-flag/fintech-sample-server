
import { students } from "../schemas/student-data.schema.js";


export const saveStudentInfo = async (userData) => {
    try {
        return await students.create(userData);
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const getAllStudentInfo = async () => {
    try {
        return await students.find();
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const getOneStudentInfo = async (email) => {
    try {
        return await students.findOne({email: email}).populate([
            { path: "transactions"},
          ]);;
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const updateStudentInfo = async (email, dataQuery) => {
    const userInfo = await students.findOne({ email: email});
    if (userInfo) {
        // update the participants
        return await students.updateOne(
            {email: email},
            {$set: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const updateStudentTransaction = async (email, dataQuery) => {
    const userInfo = await students.findOne({ email: email});
    if (userInfo) {
        // update the participants
        return await students.updateOne(
            {email: email},
            {$addToSet: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const deleteStudentInfo = async () => {
    try {
        return await students.deleteOne({email: email});
    } catch (error) {
        console.log("Student info error", error);
        return false
    }
}

