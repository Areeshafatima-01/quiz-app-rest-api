import express from "express"
import cors from "cors"
import morgan from "morgan"
import questionRoutes from "./route/question.js"
import categoryrRoutes from "./route/category.js"
import userRoutes from "./route/user.js"
import dbConnect from "./config/database.js"
import {apiRateLimit} from "./middleware/api-limit.js";
import config from "./config/config.js"
var corsOptions={
    origin:config.webAppUrl,
    optionsSuccessStatus:200
}

const app=express() //middleware for loading http request
app.use(cors())
app.use(morgan("common"))
app.use(express.json())
app.use(morgan("dev"))
app.use("/api/categories",categoryrRoutes)
app.use("/api/questions",questionRoutes)
app.use("/api/auth/",apiRateLimit,userRoutes)
dbConnect()



const port=config.port || 5000; //port number from environment variable or default 
const host=config.host || "localhost" //Host name from environment variable or default 
app.listen(port,host,()=>{
    console.log(`Server is running on ${port} and ${host}`)
})