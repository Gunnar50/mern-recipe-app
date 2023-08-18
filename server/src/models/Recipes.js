import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({
    name: {type:String, require:true},
    ingredients: [{type:String, require:true, }],
    description: {type:String, require:true},
    image: {type:String, require:true},
    cookingTime: {type:Number, require:true},
    creator: {type:mongoose.Schema.Types.ObjectId, ref:"users", require:true},
    

});

export const RecipeModel = mongoose.model("recipes", RecipeSchema) // "users" is the name of the collection / schema





