import User from "../model/user.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config();
let signUpUser = async (req, res) => {

    try {
        let { name, email, password, confirmPassword } = req.body;
        let error = []
        if (!name) {
            error.push("name is required")
        }
        if (!email) {
            error.push("email is required")
        }
        if (!password) {
            error.push("password is required")
        }
        if (!confirmPassword) {
            error.push("confirm password is required")
        }
        if (password !== confirmPassword) {
            error.push("password and confirm password  does not match")
        }
        if (error.length > 0) {
            return res.status(400).json({
                message: "validation error",
                data: null,
                error: error
            })
        }
        let userExist = await User.findOne({ email: email });
        if (userExist) {
            return res.status(400).json({
                message: "validation error",
                data: null,
                error: [
                    "user already exist with this email"
                ]
            })
        }
        bcrypt.hash(password, 10, async (err, hash) => {
            if (err) {
                return res.status(500).json({
                    message: "internal server error",
                    data: null,
                    error: error.message
                });
            }
            const user = new User({ name, email, password: hash })
            await user.save()
            let tempUser = {
                name: user.name,
                role: user.role
            }
            res.status(200).json({
                message: "user created  successfully",
                data: tempUser,
                error: null
            })
        }
        )

    } catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            data: null,
            error: error.message,
        })
    }
}
let loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email: email });
        if (!user) {
            return res.status(404).json({
                message: "Authentication failed",
                data: null,
                error: [
                    "Invalid email or password"
                ]
            })
        }
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({
                message: "Authentication Failed",
                data: null,
                error: [
                    "invalid credentials"
                ]
            })
        }
        let token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
            expiresIn: process.env.JWT_EXPIRES_IN,
        })
        res.status(200).json({
            message: "user logged in successfully",
            data: {
                token: token,
                user: {
                    name: user.name,
                    email: user.email,
                    // role: user.role,
                    // createdAt: user.createdAt,
                    // updatedAt: user.updatedAt,
                    // id: user._id,
                    // profilepicture: user.profilePicture,
                    // address: user.address,
                    // phone: user.phone,
                    // status: user.status
                }
            },
            error: null
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message
        })

    }

}
const changePassword = async (req, res) => {
    try {
         
            let userId = req.user.id;
          const { oldPassword, newPassword, confirmNewPassword } = req.body;
            let error = [];
            if (!oldPassword) {
                error.push("oldPassword is required")
            }
            if (!newPassword) {
                error.push("newPassword is required")
            }
            if (!confirmNewPassword) {
                error.push("confirmNewPassword is required")
            }
            if(oldPassword === newPassword){
                error.push("oldPassword and newPassword cannot be same")
            }
            if (newPassword !== confirmNewPassword) {
                error.push("new password and confirm new password does not match")
            }
            if (error.length > 0) {
                return res.status(400).json({
                    message: "validation error",
                    data: null,
                    error: error
                })
            }
            const user = await User.findById(userId);
        
            if (!user) {
                return res.status(404).json({
                    message: "user not found",
                    data: null,
                    error: null
                })
            }
            const isMatch = await bcrypt.compare(oldPassword, user.password);
            if (!isMatch) {
                return res.status(401).json({
                    message: "change password failed",
                    data: null,
                    error: [
                        "invalid credentials"
                    ]
                })
            }
            bcrypt.hash(newPassword, 10, async (error, hash) => {
                if (error) {
                    return res.status(500).json({
                        message: "internal server error",
                        data: null,
                        error: error.message
                    });
                }
                user.password = hash;
                await user.save();
                res.status(200).json({
                    message: "password changed successfully",
                    data: null,
                    error: null
                })
            })
        } 
    catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            data: null,
            error: error.message,
        })
    }
}
let getUser = async (req, res) => {
    try {
        const user = await User.find();
        if (!user) {
            return res.status(404).json({
                message: "user  not found",
                data: null,
                error: null
            })
        }
        res.status(200).json({
            message: "user found successfully",
            data: user,
            error: null
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server Error",
            data: null,
            error: error.message
        })

    }

}
let deleteUserById = async (req, res) => {
    try {
        const id = req.params.id;
        let user = await User.findByIdAndDelete(id)
        if (!user) {
            return res.status(404).json({
                message: "user not found",
                data: null,
                error: null
            })
        }
        res.json(
            {
                id: id,
                data: user,
                title: "something deleted"
            }
        )
    }
    catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message
        })
    }
}

let getUserById = async (req, res) => {
    try {
        let id = req.params.id;
        const user = await User.findById(id)//Products.findById(id) this function will return promice and we will wait for this promice  to get resolved when it is resolved it will store it in product

        if (!user) {
            return res.status(404).json({
                message: "user not found",
                data: null,
                error: null,
            })
        }
        {
            res.status(200).json(
                {
                    message: "user fetched successfully",
                    data: user,
                    error: null,
                })
        }
    } catch (error) {
        res.status(500).json({
            message: "internal server error",
            data: null,
            error: error.message
        })

    }

}

export { getUser, loginUser, signUpUser, getUserById, deleteUserById, changePassword };