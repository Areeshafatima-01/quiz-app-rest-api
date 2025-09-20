import {getQuestion,getQuestionById, createQuestion,deleteQuestionById,updateQuestion } from "../controller/question.js";
import  validateId from "../middleware/validateId.js";
import {verifyToken,verifyAdmin}  from "../middleware/auth.js";
import express from "express"
const router = express.Router()
//public route
router.get("/",getQuestion)
router.get("/:id",validateId,getQuestionById)
//protected route
router.post("/",verifyToken,verifyAdmin,createQuestion)
router.delete("/:id",verifyToken,verifyAdmin,validateId,deleteQuestionById)
router.put("/:id",verifyToken,verifyAdmin,validateId,updateQuestion)
export default router