
// import { sendResetPassword } from "../helpers/sendResetPassword.js";
import { config } from "dotenv";
import paystackHelper from "../helpers/paystack.js";
import {  getOneUserPaymentInfo, saveUserPaymentInfo, updatePaymentInfo } from "../models/queries/payment.query.js";
import { paymentEmailResponse } from "../helpers/payment-response.js";

config();

export const paymentController = async (req, res) => {
  const {firstName, lastName, phoneNum, email} = req.body;
  
    if(
        firstName != "" && firstName != null &&
        lastName != "" && lastName != null &&
        email != "" && email != null &&
        phoneNum != "" && phoneNum != null
    ){
        req.body.subject = "Payment for Berenia Bootcamp";
        req.body.course = "web development bootcamp";
        req.body.amount = 5000;
        const amount = req.body.amount;

        const userData = {
          firstName: firstName,
          lastName: lastName,
          email: email,
          mobile: phoneNum,
          amount: amount,
          paymentStatus: "pending",
          courseTitle: req.body.course,
          timeCreated: new Date().toISOString()
        }

        const checkUser = await getOneUserPaymentInfo(email);
        if (!checkUser) {
          throw new Error("User already exist");
        }else
        {
          await saveUserPaymentInfo(userData);
        }
        
        try {
            const { authorization_url, reference } =
          await paystackHelper.initializeTxn(
            email,
            Math.round((amount * 100 + Number.EPSILON) * 100) / 100,
            userData
          );

        [paystackPaymentUrl, paystackReference] = [
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
                <p> ${req.body.message}</p>
                </div>`
          );
        
          setTimeout(async () => {
            let message = await paymentEmailResponse({
              firstName: firstName,
               message: `This is to notify you that we've recieved your payment for 2023 
               Berenia web development bootcamp. Your certificate will be forwarded to this 
               email soon. <br> We wish you greater heights and more opportunities in all your endeavors.
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
            message: error.message,
          });
    }
  
};

