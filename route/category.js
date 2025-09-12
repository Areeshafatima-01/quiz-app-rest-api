import { createCategory,getCategory,deleteProductById,getCategoryById,updateCategory} from "../controller/category.js";
import  validateId from "../middleware/validateId.js";
import verifyToken from "../middleware/auth.js";
import express from "express"
const router = express.Router()
router.post("/",verifyToken,createCategory)
router.get("/",getCategory)
router.delete("/:id",verifyToken,validateId,deleteProductById)
router.get("/:id",validateId,getCategoryById)
router.put("/:id",verifyToken,validateId,updateCategory)
export default router