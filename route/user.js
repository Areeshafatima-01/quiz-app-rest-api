import{ signUpUser,getUserById,deleteUserById,loginUser,getUser,changePassword } from "../controller/user.js";
import  validateId from "../middleware/validateId.js";
import verifyToken from "../middleware/auth.js";
import express from "express"
const router = express.Router()
router.get("/user",getUser)
router.get("/user/:id",validateId,getUserById)
router.post("/register",signUpUser)
router.post("/login",loginUser)
router.delete("/:id",validateId,deleteUserById)
router.put("/change-password/",verifyToken,changePassword)
export default router