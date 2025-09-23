import mongoose from "mongoose";
const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
        validate:{
            validator:function(v){
                return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(v);
            },
            message:props=>`${props.value} is not a valid email!`
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        enum: ["admin", "user"],
        default: "user"
    },
    otp:{
type:String,
default:null
    },
    otpExpire:{
        type:Date,
        default:null
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updateAt:{
        type:Date,
        default:Date.now,
    },
    status:{
        type:String,
        enum:["active","inactive"],
        default:"active"
    },
    profilePicture:{
        type:String,
        default:"default.jpg"
    },
    address:{
        type:String,
        default:" ",
    },
    phone:{
        type:String,
        dafault:"",
    }
})    
let User= mongoose.model("user", userSchema);
export default User;