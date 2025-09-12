import mongoose from "mongoose"
const categorySchema=mongoose.Schema({
    "name":String,
    "description":String
})
const Category=mongoose.model("categories",categorySchema)
export default Category