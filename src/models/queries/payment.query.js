import { userPayment } from "../schemas/payment.schema.js";


export const saveUserPaymentInfo = async (userData) => {
    try {
        return await userPayment.create(userData)
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const getAllPaymentInfo = async () => {
    try {
        return await userPayment.find();
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const getOneUserPaymentInfo = async (email) => {
    try {
        return await userPayment.findOne({email: email});
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const updatePaymentInfo = async (email, dataQuery) => {
    const userInfo = await userPayment.findOne({ email: email});
    if (userInfo) {
        // update the participants
        return await userPayment.updateOne(
            {email: email},
            {$set: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const deletePaymentInfo = async () => {
    try {
        return await userPayment.deleteOne({email: email});
    } catch (error) {
        console.log("payment info error", error);
        return false
    }
}

