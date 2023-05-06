import { userTransaction } from "../schemas/payment.schema.js";


export const saveUserPaymentInfo = async (userData) => {
    try {
        return await userTransaction.create(userData)
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const getAllPaymentInfo = async () => {
    try {
        return await userTransaction.find();
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const getOneUserPaymentInfo = async (email) => {
    try {
        return await userTransaction.find({email: email});
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const getOneUserTxByRef = async (reference) => {
    try {
        return await userTransaction.findOne({reference: reference});
    } catch (error) {
        console.log("payment info error", error);
    }
}

export const updatePaymentInfo = async (id, dataQuery) => {
    const userInfo = await userTransaction.findOne({ _id: id});
    if (userInfo) {
        // update the participants
        return await userTransaction.updateOne(
            {_id: id},
            {$set: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const updateTransactionStatus = async (reference, dataQuery) => {
    const userInfo = await userTransaction.findOne({ reference: reference});
    if (userInfo) {
        // update the participants
        return await userTransaction.updateOne(
            {reference: reference},
            {$set: dataQuery }
        );
    }
    else {
        return false;
    }
}

export const deletePaymentInfo = async () => {
    try {
        return await userTransaction.deleteOne({email: email});
    } catch (error) {
        console.log("payment info error", error);
        return false
    }
}

