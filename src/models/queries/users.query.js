
import { users } from "../schemas/users.schema.js";


export const saveUserInfo = async (userData) => {
    try {
        return await users.create(userData);
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const getAllUserInfo = async () => {
    try {
        return await users.find().populate("transactions");
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const getOneUserInfo = async (email) => {
    try {
        return await users.findOne({email: email}).populate("transactions");
    } catch (error) {
        console.log("Student info error", error);
    }
}

export const updateUserInfo = async (email, dataQuery) => {
    const userInfo = await users.findOne({ email: email});
    if (userInfo) {
        // update the participants
        return await users.updateOne(
            {email: email},
            {$set: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const updateUserTransaction = async (email, dataQuery) => {
    const userInfo = await users.findOne({ email: email});
    if (userInfo) {
        // update the participants
        return await users.updateOne(
            {email: email},
            {$addToSet: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const deleteUserInfo = async () => {
    try {
        return await users.deleteOne({email: email});
    } catch (error) {
        console.log("Student info error", error);
        return false
    }
}

