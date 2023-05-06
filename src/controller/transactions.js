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
      res.status(400).json({
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
        const resp = await initiateTransfer(
          reference,
          recipientCode.recipient,
          amountINKobo,
          narration
        );

        res.status(200).json({
          status: "success",
          message: "Transaction completed",
          data: resp,
        });
      } catch (error) {
        res.status(400).json({
          status: "error",
          message: error.message,
        });
      }
    }
  } else {
    res.status(400).json({
      status: "error",
      message: "Incompleted data. All fields are required",
    });
  }
};

export const getOneTransaction = async (req, res) => {
  const email = req.params.email;
  const txn = await getOneUserPaymentInfo(email);

  if (userData) {
    res.status(200).json({
      status: "success",
      message: "Students data retrieved successfully",
      data: txn,
    });
  } else {
    // throw new NotFoundError("Student not found");
    res.status(400).json({
      status: "failed",
      message: "Students not found",
      data: userData,
    });
  }
};

export const getAllTransaction = async (req, res) => {
  console.log("not yet");
};
