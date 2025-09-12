import Category from "../model/category.js";
const createCategory = async (req, res) => {
    try {
        let categoryData = req.body;
        const category = new Category(categoryData)
        await category.save()
        res.status(200).json({
            message: "category saved successfully",
            data: category,
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
let getCategory = async (req, res) => {
    try {
        const category = await Category.find();
        if (!category) {
            return res.status(404).json({
                message: "category  not found",
                data: null,
                error: null
            })
        }
        res.status(200).json({
            message: "category found successfully",
            data: category,
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
let deleteProductById = async (req, res) => {
    try {
        let id = req.params.id;

        let category = await Category.findByIdAndDelete(id)
        if (!category) {
            return res.status(404).json({
                message: "category not found",
                data: null,
                error: null
            })
        }
         res.status(200).json(
            {
                id: id,
                data: category,
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
let getCategoryById = async (req, res) => {
    try {
        let id = req.params.id;
        //fetch products from database
        // if there is some error in this line control autamatically moves to catch eg.if we writw product.find()
        const category = await Category.findById(id)//Products.findById(id) this function will return promice and we will wait for this promice  to get resolved when it is resolved it will store it in product
        //.populate("category")//populate is used to fetch the complete category object instead of just the id
        if (!category) {
            return res.status(404).json({
                message: "category not found",
                data: null,
                error: null,
            })
        }
        {
            res.status(200).json(
                {
                    message: "category fetched successfully",
                    data: category,
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
const updateCategory = async (req, res) => {
    try {
        const { id } = req.params;
        let Categorydata = req.body;
        const category = await Category.findByIdAndUpdate(
            id, Categorydata, { new: true, }
        );

        if (!category) {
            return res.status(404).json({
                message: "Category not found"
            });
        }

        res.status(200).json({
            message: "Category fetched successfully",
            data: category,
            error: null
        });
    } catch (error) {
        res.status(500).json({
            message: "Internal server error",
            data: null,
            error: error.message
        });
    }
}
export { createCategory, getCategory, deleteProductById, getCategoryById, updateCategory };