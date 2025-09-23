import nodemailer from "nodemailer"
import hbs from 'nodemailer-express-handlebars';
import path from "path";
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


const handlebarOptions = {
    viewEngine: {
        partialsDir: path.resolve('./views/'),
        defaultLayout: false,
    },
    viewPath: path.resolve('./views/'),
};

// use a template file with nodemailer
transporter.use('compile', hbs(handlebarOptions))

const sendEmail= async(to,subject,text)=>{
    try{
         const info = await transporter.sendMail({
    from: process.env.EMAIL_FROM,
    to: to,
    subject: subject,
   // text: text, // plain‑text body
    template:"email",
    context:{
      otp:text
    }
    // html: "<b>Hello world?</b>", // HTML body
  });
  console.log("email sent", info.response)
    }
    catch(error){
        console.error("error sending email",error)
       
    }


    }
    export default sendEmail;