import mongoose from "mongoose"
const validateID=(req,res,next)=>
    {
const id =req.params.id;
    if(!mongoose.Types.ObjectId.isValid(id))
    {
      return  res.status(400).json({
            message:"invalid id",
            data:null,
            error:null // query:if we use error:error.message here it will not execute this block rather it will execute catch block because reference error will occour and it will move to catch block 
        })
     }
     next()
    }
    export default validateID;
