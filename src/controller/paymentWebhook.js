import { paymentEmailResponse } from "../helpers/payment-response.js";
import { updatePaymentInfo } from "../models/queries/payment.query.js";

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
      console.log("paystack response authenticity verified. status", data);

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
            await updatePaymentInfo(data.metadata.email,
                { paymentStatus: "completed" }
              );
        }

       /** send email notification to the resident for payment transaction completion update */
    
        try {
            let message = await paymentEmailResponse({
                firstName: data.metadata.firstName,
                 message: `This is to notify you that we've recieved your payment for 2023 
                 Berenia web development bootcamp. Your certificate will be forwarded to this 
                 email soon. <br> We wish you greater heights and more opportunities in all your endeavors.
              `})
              await sendMail(data.metadata.email, "Berenia Payment Update", message);
        
        } catch (error) {
          
        }
      } else {
        /** if paystack return declined event... meaning payment was not successful */
        await updatePaymentInfo(data.metadata.email,
          { paymentStatus: "failed" }
        );
        
      }
    }

    return response.sendStatus(200);
  }