import crypto from "crypto";

export const generateReferenceCode = (length) => {
  const result = crypto.randomBytes(length).toString("hex");

  return result;
};

export default generateReferenceCode;
