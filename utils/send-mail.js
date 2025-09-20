import nodemailer from "nodemailer"
import dotenv from "dotenv"
dotenv.config()

var transporter = nodemailer.createTransport({
  host: process.env.EMAIL_HOST,
  port: process.env.EMAIL_PORT,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});
const sendEmail= async (to,subject,text)=>{
    try{
         const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
    text: text, // plain‑text body
    // html: "<b>Hello world?</b>", // HTML body
  });
  console.log("email sent", info.response)
    }
    catch(error){
        console.error("error sending email",error)
       
    }


    }
    export default sendEmail;