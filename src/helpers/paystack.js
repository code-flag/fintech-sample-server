import { config } from "dotenv";
import paystack from "paystack-api";
import debug from "debug";

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
