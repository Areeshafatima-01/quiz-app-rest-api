import express from "express"
const app=express()
import dotenv from "dotenv"
import morgan from "morgan"
import dbConnect from "./config/database.js"
import cors from "cors"
var corsOptions={
    origin:process.env.WEBAPP_URL,
    optionsSuccessStatus:200
}
dotenv.config()
app.use(cors(corsOptions))
app.use(morgan("common")) //middleware for loading http request
app.use(express.json())
app.use(morgan("dev"))
import categoryrRoutes from "./route/category.js"
app.use("/api/categories",categoryrRoutes)
import questionRoutes from "./route/question.js"
app.use("/api/questions",questionRoutes)
import userRoutes from "./route/user.js"
app.use("/api/auth/",userRoutes)
dbConnect()



const port=process.env.PORT || 5000; //port number from environment variable or default 
const host=process.env.HOST || "localhost" //Host name from environment variable or default 
app.listen(port,host,()=>{
    console.log(`Server is running on ${port}`)
})
