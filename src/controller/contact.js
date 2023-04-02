import { emailResponse } from "../helpers/contact-response.js";
import { sendMail } from "../helpers/send-mail.js";
import { sendResetPassword } from "../helpers/sendResetPassword.js";
import { config } from "dotenv";
config();
export const contactUsMessage = async (req, res) => {
  // console.log("message", req.body.email);
  const bereniaMailRes = await sendMail(
    process.env.EMAIL_USER,
    req.body.subject,
    `<div style="background: #fff; padding: 10px;">
        <h2>New Message</h2>
        <h3>From: ${req.body.firstName + " " + req.body.lastName}  </h3>
        <p> ${req.body.message}</p>
        </div>`
  );

  setTimeout(async () => {
    let message = await emailResponse(req.body);
    await sendMail(req.body.email, req.body.subject, message);
  }, 2000);

  // sendResetPassword({email: req.body.email, name: req.body.firstname, resetpasswordToken: req.body.message});

  res.status(200).json({
    status: "success",
    message: "Message received. Thank you",
  });
};
