import{ signUpUser,getUserById,deleteUserById,loginUser,getUser,changePassword } from "../controller/user.js";
import  validateId from "../middleware/validateId.js";
import {verifyToken,verifyAdmin} from "../middleware/auth.js";
import { apiRateLimit } from "../middleware/api-limit.js";
import express from "express"
const router = express.Router()
//protected routes
router.get("/user",verifyToken,verifyAdmin,getUser)
router.get("/me",verifyToken,getUserById)
router.delete("/:id",validateId,deleteUserById)
router.put("/change-password/",apiRateLimit,verifyToken,changePassword)
//public routes
router.post("/register",apiRateLimit,signUpUser)
router.post("/login",apiRateLimit,loginUser)

export default router