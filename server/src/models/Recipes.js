import mongoose from "mongoose";


const RecipeSchema = new mongoose.Schema({
    name: {type:String, required:true},
    ingredients: [{type:String, required:true, }],
    description: {type:String, required:true},
    image: {type:String, required:true},
    cookingTime: {type:Number, required:true},
    creator: {type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    votes: {type:Number, default: 0},
    comments: [{type:mongoose.Schema.Types.ObjectId, ref: "comments"}],
    date: {type:Date, default:Date.now}

});

export const RecipeModel = mongoose.model("recipes", RecipeSchema) // "users" is the name of the collection / schema





