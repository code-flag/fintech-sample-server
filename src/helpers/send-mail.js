import { config } from "dotenv";
import { createTransport } from "nodemailer";
import debug from "debug";

config();

const DEBUG = debug("dev");

const transporter = createTransport({
  port: process.env.EMAIL_PORT,
  host: process.env.EMAIL_HOST,
  secure: true,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  }
});

export async function sendMail(to, subject, html) {
  const mailInfo = {
    from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    attachDataUrls: true,
    html: html,
  };

  console.log("mailInfo ", mailInfo);
  transporter.sendMail(mailInfo, (error, info) => {
    // console.log("error ", error, "info", info);
    if (subject == "Berenia Payment Update" || subject == "Payment Update") {
      console.log("error ", error, "info", info);
    }
    if (error) {
      DEBUG(error);
    }
    
    return error ? false : true;
  });
}

export async function sendBulkMail(bcc, subject, html) {
  const mailInfo = {
    from: `${process.env.EMAIL_SENDER} <${process.env.EMAIL_USER}>`,
    to: process.env.EMAIL_USER,
    bcc: bcc,
    subject: subject,
    html: html,
  };

  transporter.sendMail(mailInfo, (error, info) => {
    if (error) {
      DEBUG(error);
    }
    return true;
  });
}
