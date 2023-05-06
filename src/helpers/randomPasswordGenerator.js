import crypto from "crypto";

export const generateRandomPassword = (length) => {
  const result = crypto.randomBytes(length).toString("hex");

  return result;
};

export default generateRandomPassword;
