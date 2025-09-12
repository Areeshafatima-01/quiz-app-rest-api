import Question from "../model/question.js";
let getQuestion = async (req, res) => {
    try {
        const question = await Question.find().populate("category");
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
const createQuestion = async (req, res) => {
    try {
        let questionData = req.body;
     let errors = [];
        if (!questionData.question) {
            errors.push({ question: "question is required" });
        }
        if (!questionData.option || questionData.option.length < 4) {
            errors.push({ option: "four options are required" });
        }
        if (!questionData.correctAnswer) {
            errors.push({ correctAnswer: "correct answer is required" });
        }
        if (!questionData.category) {
            errors.push({ category: "category is required" });
        }

        if (errors.length > 0) {
            return res.status(400).json({
                message: "validation error",
                data: null,
                error: errors
            });
        }

        const question = new Question(questionData)        
        await question.save()
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
        let question = await Question.findByIdAndDelete(id)
        if (!question) {
            return res.status(404).json({
                message: "question not found",
                data: null,
                error: null
            })
        }
        res.json(
            {
                id: id,
                data: question,
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

const updateQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        let questiondata = req.body;
        const question = await Question.findByIdAndUpdate(
            id, questiondata, { new: true, }
        );

        if (!question) {
            return res.status(404).json({
                message: "question not found",
    
            });
        }

        res.status(200).json({
            message: "question fetched successfully",
            data: question,
            error: null
        });
    } catch (error) {
        res.status(500).json({
             message: "Internal server error", 
             data:null,
             error:error.message });
    }
};

export { getQuestion,createQuestion,deleteQuestionById ,updateQuestion};