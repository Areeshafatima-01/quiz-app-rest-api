import {getQuestion, createQuestion,deleteQuestionById,updateQuestion } from "../controller/question.js";
import  validateId from "../middleware/validateId.js";
import express from "express"
const router = express.Router()
router.get("/",getQuestion)
router.post("/",createQuestion)
router.delete("/:id",validateId,deleteQuestionById)
router.put("/:id",validateId,updateQuestion)
export default router