// import hbs from "nodemailer-express-handlebars";
// import path from "path";
// import { createTransport } from "nodemailer";
// import { config } from "dotenv";
// config();

// export const sendTemplateEmail = async ({ to, subject, template, context }) => {
  
//   const transporter = createTransport({
//     port: process.env.EMAIL_PORT,
//     host: process.env.EMAIL_HOST,
//     secure: true,
//     auth: {
//       user: process.env.EMAIL_USER,
//       pass: process.env.EMAIL_PASS,
//     }
//   });

//   const handlebarOptions = {
//     viewEngine: {
//       extName: ".handlebars",
//       pathDir: path.resolve("src/views"),
//       defaultLayout: false,
//     },
//     viewPath: path.resolve("src/views"),
//     extName: ".handlebars",
//   };

//   transporter.use("compile", hbs(handlebarOptions));
//   return transporter.sendMail(
//     {
//       from: process.env.EMAIL_USER, // sender address
//       to, // list of receivers
//       subject, // Subject line
//       template,
//       context,
//     },
//     (error, info) => {
//       if (error) {
//         return console.log(error);
//       }
//       console.log(`Message sent to ${to} successfully`);
//     }
//   );
// };
