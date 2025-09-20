import { createCategory,getCategory,deleteProductById,getCategoryById,updateCategory} from "../controller/category.js";
import  validateId from "../middleware/validateId.js";
import {verifyToken,verifyAdmin} from "../middleware/auth.js";
import express from "express"
const router = express.Router()
//public routes
router.get("/",getCategory)
router.get("/:id",validateId,getCategoryById)
//protected routes
router.post("/",verifyToken,verifyAdmin,createCategory)
router.delete("/:id",verifyToken,verifyAdmin,validateId,deleteProductById)
router.put("/:id",verifyToken,verifyAdmin,validateId,updateCategory)
export default router