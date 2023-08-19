import mongoose from "mongoose";


const UserSchema = new mongoose.Schema({
    username: {type:String, required:true, unique: true},
    password: {type:String, required:true},
    votedRecipes: [{type:mongoose.Schema.Types.ObjectId, ref: "recipes"}]
});

export const UserModel = mongoose.model("users", UserSchema) // "users" is the name of the collection 





