import express from "express"
import cors from "cors"
import dotenv from "dotenv"
import morgan from "morgan"
import questionRoutes from "./route/question.js"
import categoryrRoutes from "./route/category.js"
import userRoutes from "./route/user.js"
import dbConnect from "./config/database.js"
import {apiRateLimit} from "./middleware/api-limit.js";

var corsOptions={
    origin:process.env.WEBAPP_URL,
    optionsSuccessStatus:200
}

dotenv.config()
const app=express() //middleware for loading http request
app.use(cors())
app.use(morgan("common"))
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/categories",categoryrRoutes)
app.use("/api/questions",questionRoutes)
app.use("/api/auth/",apiRateLimit,userRoutes)
dbConnect()



const port=process.env.PORT || 3000; //port number from environment variable or default 
const host=process.env.HOST || "127.0.0.1" //Host name from environment variable or default 
app.listen(port,host,()=>{
    console.log(`Server is running on ${port} and ${host}`)
})