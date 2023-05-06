import { config } from "dotenv";
import paystack from "paystack-api";
import debug from "debug";
import axios from 'axios';
const DEBUG = debug("dev");

config();

const paystackHelper = paystack(process.env.PAYSTACK_SECRET_KEY);

export default {
  subAccount: async (
    business_name,
    settlement_bank,
    account_number,
    percentage_charge
  ) => {
    try {
      const { data } = await paystackHelper.subaccount.create({
        business_name,
        settlement_bank,
        account_number,
        percentage_charge,
      });
      return data;
    } catch (error) {
      DEBUG("Paystack error: ", error);
      return error;
    }
  },

  initializeTxn: async (email, amount, otherOptions, subaccount) => {
    try {
      const { data } = await paystackHelper.transaction.initialize({
        email,
        amount,
        metadata: otherOptions,
        subaccount,
      });
      return data;
    } catch (error) {
      DEBUG("Paystack error: ", error);
      return error;
    }
  },

  initializePlanTxn: async (email, amount, plan, otherOptions) => {
    try {
      const { data } = await paystackHelper.transaction.initialize({
        email,
        amount,
        plan,
        metadata: otherOptions,
      });
      return data;
    } catch (error) {
      DEBUG("Paystack error: ", error);
      return error;
    }
  },

  verifyTxn: async (reference) => {
    try {
      const response = await paystackHelper.transaction.verify({ reference });
      return response;
    } catch (error) {
      DEBUG("Paystack error: ", error);
      return error;
    }
  },

  verifyAccountNumber: async (account_number, bank_code) => {
    try {
      const { data } = await paystackHelper.verification.resolveAccount({
        account_number,
        bank_code,
      });
      return data;
    } catch (error) {
      DEBUG("Paystack error: ", error);
      return error;
    }
  },
};

export const createTransferRecipient = async (accountName, accountNumber, bankCode) => {
  try {
    const response = await axios.post(`https://api.paystack.co/transferrecipient`,{
      "type": "nuban", 
      "name": accountName, 
      "account_number": accountNumber, 
      "bank_code": bankCode, 
      "currency": "NGN"
    }, {
      headers: {
        Authorization: 'Bearer sk_test_0880c1a9a5273248688de6d7bec39a89996d2254',
      },
    });
    // console.log("account details", response.data.data);
    return  response.data.data;
  } catch (error) {
    // console.error(error);
  }
}

export const initiateTransfer = async (reference, recipient, amount, narration, source = "balance") => {
  try {
    const response = await axios.post(`https://api.paystack.co/transfer`,{
      "source": source, 
      "amount": amount,
      "reference": reference, 
      "recipient": recipient, 
      "reason": narration ?? "not available" 
    }, {
      headers: {
        Authorization: 'Bearer sk_test_0880c1a9a5273248688de6d7bec39a89996d2254',
      },
    });
    // console.log("transfer response", response.data.data);
    return true;
  } catch (error) {
    // console.error(error);
    return false;
  }
}