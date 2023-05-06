// import { sendResetPassword } from "../helpers/sendResetPassword.js";
import { config } from "dotenv";
import {
  createTransferRecipient,
  initiateTransfer,
} from "../helpers/paystack.js";
import {
  getOneUserPaymentInfo,
  saveUserPaymentInfo,
} from "../models/queries/payment.query.js";
import {
  getOneUserInfo,
  updateUserTransaction,
} from "../models/queries/users.query.js";
import generateReferenceCode from "../helpers/uniqueAccessCodeGenerator.js";

config();

export const createTransaction = async (req, res) => {
  const {
    email,
    amount,
    narration,
    bankName,
    bankCode,
    accountNumber,
    recipientName,
  } = req.body;

  if (
    email != "" &&
    email != null &&
    amount != "" &&
    amount != null &&
    accountNumber != "" &&
    accountNumber != null &&
    bankCode != "" &&
    bankCode != null &&
    bankName != "" &&
    bankName != null &&
    recipientName != "" &&
    recipientName != null
  ) {
    const reference = generateReferenceCode(16);

    // for transaction schema
    const userData = {
      email: email,
      amount: amount,
      bankCode: bankCode,
      bankName: bankName,
      recipientName: recipientName,
      narration: narration,
      reference: reference,
      paymentStatus: "pending",
      timeCreated: new Date().toISOString(),
    };

    const checkUser = await getOneUserInfo(email);
    if (checkUser.balance < amount) {
      res.status(200).json({
        status: "failed",
        message: "Insufficient balance.",
        data: [],
      });
    } else {
      const txn = await saveUserPaymentInfo(userData);
      if (txn) {
        await updateUserTransaction(email, { transactions: txn._id });
      }

      try {
        const recipientCode = await createTransferRecipient(
          recipientName,
          accountNumber,
          bankCode
        );

        let amountINKobo =
          Math.round((amount * 100 + Number.EPSILON) * 100) / 100;


        try {
          const resp = await initiateTransfer(
            reference,
            recipientCode.recipient,
            amountINKobo,
            narration
          );

          if(resp){
            try {
              await updateTransactionStatus(reference , {
                paymentStatus: "completed",
              });       
              
              const user = await  getOneUserInfo(email);
              const balance = user.balance - amount;
              await updateUserInfo(email, {balance: balance});
            } catch (error) {
              console.log(error.message);
            }
          }
        } catch (error) {
          try {
            await updateTransactionStatus(reference , {
              paymentStatus: "completed",
            });       
            
            const user = await  getOneUserInfo(email);
            const balance = user.balance - amount;
            await updateUserInfo(email, {balance: balance});

          } catch (error) {
            // console.log(error.message);
          }
        }

        res.status(200).json({
          status: "success",
          message: "Transaction completed",
          data: resp,
        });
      } catch (error) {
        res.status(200).json({
          status: "failed",
          message: error.message,
        });
      }
    }
  } else {
    res.status(200).json({
      status: "error",
      message: "Incompleted data. All fields are required",
    });
  }
};

export const getOneTransaction = async (req, res) => {
  
  const email = req.params.email;
  const txn = await getOneUserPaymentInfo(email);

  if (txn) {
    res.status(200).json({
      status: "success",
      message: "Transaction data retrieved successfully",
      data: txn,
    });
  } else {
    // throw new NotFoundError("Student not found");
    res.status(200).json({
      status: "failed",
      message: "Transaction not found",
      data: txn,
    });
  }
};

export const getAllTransaction = async (req, res) => {
  console.log("not yet");
};
