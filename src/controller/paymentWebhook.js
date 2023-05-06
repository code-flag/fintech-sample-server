import { getOneUserTxByRef, updateTransactionStatus } from "../models/queries/payment.query.js";
import * as crypto from "crypto";
import { config } from "dotenv";
import { getOneUserInfo, updateUserInfo } from "../models/queries/users.query.js";
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
    const { status, data } = request.body;

    if (status == true) {
      /** if transaction is successful and the payment balance is Zero continue to processing of service request
       *  - This is only applicable to certain service request such as
       * - dependant full portal access
       * ** but for complex service or simmple request that is not automated in the system, this block
       * won't execute
       */
      if (data.status == "success") {
        try {
          await updateTransactionStatus(data.reference , {
            paymentStatus: data.status,
          });       
          const txn = await getOneUserTxByRef(data.reference);
          const user = await  getOneUserInfo(txn.email);
          const balance = user.balance - txn.amount;
          await updateUserInfo(txn.email, {balance: balance});
        } catch (error) {
          console.log("error", error);
        }
      }
    } else {
      /** if paystack return declined event... meaning payment was not successful */
      await updateTransactionStatus(data.reference , {
        paymentStatus: data.status,
      }); 
    }
  }

  return response.sendStatus(200);
};
