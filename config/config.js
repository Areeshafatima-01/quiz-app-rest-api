import dotenv from "dotenv"
import path from "path"

const env=process.env.NODE_ENV || "local";
//load apropriate env file based on environment
const envFilePath = path.resolve(`.env.${env}`);
dotenv.config({path:envFilePath})

console.log(`Loading environment variable from ${process.env.NODE_ENV}`)
export default{
    port:process.env.PORT,
    host:process.env.HOST,
    mongodbUrl:process.env.MONGO_URI,
    jwtSecret:process.env.JWT_SECRET,
    jwtExpiresIn:process.env.JWT_EXPIRES_IN,
    emailHost:process.env.EMAIL_HOST,
    emailport:process.env.EMAIL_PORT,
    emailUser:process.env.EMAIL_USER,
    emailPassword:process.env.EMAIL_PASSWORD,
    emailFrom:process.env.EMAIL_FROM,
    webAppUrl:process.env.WEBAPP_URL

}