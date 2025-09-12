import mongoose from "mongoose"
import dotenv from "dotenv"
dotenv.config()
const dbConnect=()=>{
mongoose.connect(process.env.MONGODB_URI)
.then(()=>{
    console.log("mongodb connected successfully")
})
.catch((error)=>{
    console.log("mongodb connection failed",error.message)
})
}
export  default dbConnect