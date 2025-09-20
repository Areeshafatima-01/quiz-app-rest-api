import Question from "../model/question.js";
let getQuestion = async (req, res) => {
    try {
        const question = await Question.find().populate("category").populate("userId",["name","email"]);
        if (!question) {
            return res.status(404).json({
                message: "question  not found",
                data: null,
                error: null
            })
        }
        res.status(200).json({
            message: "question found successfully",
            data: question,
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
let getQuestionById=async (req,res)=>{
try{
   let id=req.params.id;
    const question=await Question.findById(id)//Products.findById(id) this function will return promice and we will wait for this promice  to get resolved when it is resolved it will store it in product
  .populate("category")//populate is used to fetch the complete category object instead of just the id
  .populate("userId",["name","email"])
  if(!question)
  {
    return res.status(404).json({
        message:"question not found",
        data:null,
        error:null,
    })
  }
    {  res.status(200).json(
    {
        message:"question fetched successfully",
        data:question,
        error:null,
})
    }
}catch(error){
    res.status(500).json({
        message:"internal server error",
        data:null,
        error:error.message
})

}
   
}
const createQuestion = async (req, res) => {
    try{
        let {question,option,correctAnswer,category} = req.body;
     let errors = [];
        if (!question) {
            errors.push({ question: "question is required" });
        }
        if (!option || option.length < 4) {
            errors.push({ option: "four options are required" });
        }
        if (!correctAnswer) {
            errors.push({ correctAnswer: "correct answer is required" });
        }
        if (!category) {
            errors.push({ category: "category is required" });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: "validation error",
                data: null,
                error: errors
            });
        }
        let user=req.user;
        console.log("user info from token",user);
        const questions = new Question({question,option,correctAnswer,category,userId:user.id});        
        await questions.save()
        console.log(questions)
        res.status(200).json({
            message: "question saved successfully",
            data: question,
            error: null
        })
    }
    catch (error) {
        res.status(500).json({
            message: "Internal Server error",
            data: null,
            error: error.message,
        }
        )
    }
}
let deleteQuestionById = async (req, res) => {
    try {
        const id = req.params.id;
        let user=req.user;
        let questions = await Question.deleteOne({
            _id:id,
            userId:user.id
        })
        if(questions.deletedCount===0){
    return res.status(200).json({
        message:"question not found or not owned by user",
        data:null,
        error:null
    })
}
      return res.status(200).json(
            {
                message:"Question deleted successfully",
                data: questions,
               error:null
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

const updateQuestion = async (req, res) => {
    try {
        let id = req.params.id;
        let questiondata = req.body;
        let user=req.user;
         let userId=user.id;
        const questions = await Question.findOneAndUpdate({
  _id:id, 
  userId:userId},
  questiondata, { new: true, }
        );

        if (!questions) {
            return res.status(404).json({
                message: "question not found",
    data:null,
    error:null
            });
        }

        res.status(200).json({
            message: "question updated successfully",
            data: questions,
            error: null
        });
    } catch (error) {
        res.status(500).json({
             message: "Internal server error", 
             data:null,
             error:error.message });
    }
};

export { getQuestion,getQuestionById,createQuestion,deleteQuestionById ,updateQuestion};