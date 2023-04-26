import { paymentEmailResponse } from "../helpers/payment-response.js";
import { updatePaymentInfo } from "../models/queries/payment.query.js";
import { sendMail } from "../helpers/send-mail.js";
import * as crypto from 'crypto';
import { config } from "dotenv";
config();

 /**
   * This method is used get paystack event after user payment
   * - The method recieve a payment response from paystack
   * @param {*} request
   * @param {*} response
   * @returns
   */
 export const trackPaystackEvent = async (request, response) => {

    /** always check the paystack request signature before processing event*/
    const hash = crypto
      .createHmac("sha512", process.env.PAYSTACK_SECRET_KEY)
      .update(JSON.stringify(request.body))
      .digest("hex");
    if (hash == request.headers["x-paystack-signature"]) {
      const { event, data } = request.body;
      
      if (event === "charge.success") {
       
        /** if transaction is successful and the payment balance is Zero continue to processing of service request
         *  - This is only applicable to certain service request such as
         * - dependant full portal access
         * ** but for complex service or simmple request that is not automated in the system, this block
         * won't execute
         */
        if (
          data.status === "success" &&
          data.gateway_response === "Successful" 
        ) {
            await updatePaymentInfo(data.metadata.txnId,
                { paymentStatus: "completed" }
              );
        }

       /** send email notification to the resident for payment transaction completion update */
    
        try {

            try {
              await sendMail(
                process.env.EMAIL_USER,
                "Payment Update",
                `<div style="background: #fff; padding: 10px;">
                    <h2>Certificate Payment Update</h2>
                    <h3>From: ${data.metadata.firstName + " " + data.metadata.lastName}  </h3>
                    <p> This is to notify you that the above named student payment was successful</p>
                    </div>`
              );
              
            } catch (error) {
              console.log("admin update error", error);
            }

            try {
              let message = await paymentEmailResponse({
                firstName: data.metadata.firstName,
                 message: `This is to notify you that we've recieved your payment for 2023 
                 Berenia web development bootcamp. Your certificate will be forwarded to this 
                 email soon. <br> We wish you greater heights and more opportunities in all your endeavors.
              `})
              setTimeout(async () => {
                await sendMail(data.metadata.email, "Berenia Payment Update", message);
              }, 2000);
            } catch (error) {
              console.log("user email update error", error);
            }
        
        } catch (error) {
          console.log("send payment email update error", error?.message);
        }
      } else {
        /** if paystack return declined event... meaning payment was not successful */
        await updatePaymentInfo(data.metadata.txnId,
          { paymentStatus: "failed" }
        );
        
      }
    }

    return response.sendStatus(200);
  }