import { Schema,model,models } from "mongoose";

const categorySchema = new Schema({
    name: { type: String, required: true, unique: true },
});

const Category = models.Category || model("Catagory", categorySchema);
export default Category;