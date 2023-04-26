
// import { sendResetPassword } from "../helpers/sendResetPassword.js";
import { config } from "dotenv";
import paystackHelper from "../helpers/paystack.js";
import {BadRequestError}  from "../helpers/error.js";
import {  getOneUserPaymentInfo, saveUserPaymentInfo, updatePaymentInfo } from "../models/queries/payment.query.js";
import { paymentEmailResponse } from "../helpers/payment-response.js";
import { sendMail } from "../helpers/send-mail.js";

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

        const checkUser = await getOneUserPaymentInfo(email);
        if (!checkUser) {
          // throw new BadRequestError("User already exist");
          // res.status(200).json({
          //   status: "error",
          //   message: "User Already exist",
          // });

          await saveUserPaymentInfo(userData);
        }else
        {
          // await saveUserPaymentInfo(userData);
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

