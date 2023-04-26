
// import { sendResetPassword } from "../helpers/sendResetPassword.js";
import { config } from "dotenv";
import paystackHelper from "../helpers/paystack.js";
import {BadRequestError}  from "../helpers/error.js";
import { saveUserPaymentInfo, updatePaymentInfo } from "../models/queries/payment.query.js";
import { paymentEmailResponse } from "../helpers/payment-response.js";
import { sendMail } from "../helpers/send-mail.js";
import { getOneStudentInfo, saveStudentInfo, updateStudentTransaction } from "../models/queries/student-data.query.js";

config();

export const paymentController = async (req, res) => {
  const {firstName, lastName, mobile, email} = req.body;
  
    if(
        firstName != "" && firstName != null &&
        lastName != "" && lastName != null &&
        email != "" && email != null &&
        mobile != "" && mobile != null
    ){
        req.body.subject = "Payment for Berenia Bootcamp";
        req.body.course = "web development bootcamp";
        req.body.amount = 5000;
        const amount = req.body.amount;

        // for transaction schema
        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
          amount: amount,
          paymentStatus: "pending",
          courseTitle: req.body.course,
          timeCreated: new Date().toISOString()
        }

        // for student data schema
        const userInfo = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: mobile,
        }

        const checkUser = await getOneStudentInfo(email);

        if (!checkUser) {
          await saveStudentInfo(userInfo);
          const txn = await saveUserPaymentInfo(userData);
          console.log("txn", txn);
          if (txn) {
            await updateStudentTransaction(email, {transactions: txn._id});
            // this is used for paystack metadata
            userData.txnId = txn._id;
          }
          
        }else
        {
          const txn = await saveUserPaymentInfo(userData);
          console.log("txn 2", txn);
          if (txn) {
            await updateStudentTransaction(email, {transactions: txn._id});
             // this is used for paystack metadata
             userData.txnId = txn._id;
          }
        }
        
        try {
            const { authorization_url, reference } =
          await paystackHelper.initializeTxn(
            email,
            Math.round((amount * 100 + Number.EPSILON) * 100) / 100,
            userData
          );

        const [paystackPaymentUrl, paystackReference] = [
          authorization_url,
          reference,
        ];

        /** save the payment reference into database */
        await updatePaymentInfo(email, 
           { paymentRef: paystackReference });

          const bereniaMailRes = await sendMail(
            process.env.EMAIL_USER,
            req.body.subject,
            `<div style="background: #fff; padding: 10px;">
                <h2>New Certificate Payment</h2>
                <h3>From: ${req.body.firstName + " " + req.body.lastName}  </h3>
                <p> New student is paying for certificate</p>
                </div>`
          );
        
          setTimeout(async () => {
            let message = await paymentEmailResponse({
              firstName: firstName,
               message: `This is to notify you that you initiated a payment for Berenia 2023 web bootcamp certificate.
            `})
            await sendMail(req.body.email, req.body.subject, message);
          }, 2000);
      
          res.status(200).json({
            status: "success",
            message: "Good job! kindly made your payment in the next page you will be redirected to. Thank you.",
            paymentUrl: authorization_url,
          });
        } catch (error) {
          console.log("Paymeny error", error);
          res.status(400).json({
            status: "error",
            message: error.message,
          });
        }
    }
    else {
        res.status(400).json({
            status: "error",
            message: "Imcompleted data. All fields are required",
          });
    }
  
};

export const getOneStudentTransaction = async (req, res) => {
  console.log("not yet");
}

export const getAllStudentsTransaction = async (req, res) => {
  console.log("not yet");
}
