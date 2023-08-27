import mongoose from "mongoose";


const CommentSchema = new mongoose.Schema({
    comment: {type:String, required:true},
    creator: {type:mongoose.Schema.Types.ObjectId, ref:"users", required:true},
    date: {type:Date, default:Date.now}
});

export const CommentModel = mongoose.model("comments", CommentSchema) // "users" is the name of the collection / schema





