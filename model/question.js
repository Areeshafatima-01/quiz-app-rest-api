import mongoose from "mongoose";

const questionSchema = new mongoose.Schema({
  question: { type: String, required: true },
  option: [{ type: String, required: true }],
  correctAnswer: { type: String, required: true }, // index of the correct option
  category: { 
    type: mongoose.Schema.Types.ObjectId,
  ref:"categories"
 },
 userId:{
   type:mongoose.Schema.Types.ObjectId,
   ref:"user"
 }
})
const Question = mongoose.model('question', questionSchema);
export default Question;