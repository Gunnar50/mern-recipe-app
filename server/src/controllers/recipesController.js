import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";


export const getAllRecipes = async (req, res) => {
    try {
        const response = await RecipeModel.find({}).populate("creator", "username").exec();
        res.json(response);
    } catch(err) {res.json(err);}
}


export const createRecipe = async (req, res) => {
    const recipe = new RecipeModel(req.body);
    try {
        const response = await recipe.save();
        res.json(response);
    } catch(err) {res.json(err);}

}

export const voteForRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.votedRecipes.push(recipe);
        recipe.votes++;
        await user.save();
        await recipe.save();

        res.json({votedRecipes: user.votedRecipes});

    } catch(err) {res.json(err);}

}

export const getVotedRecipesIDs = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        res.json({votedRecipes: user?.votedRecipes})
        
    } catch(err) {res.json(err);}
    
}

export const getVotedRecipes = async (req, res) => {
    try {
        const user = await UserModel.findById(req.params.id);
        const votedRecipes = await RecipeModel.find({_id: {$in: user.votedRecipes}}).populate("creator", "username").exec();
        res.json({votedRecipes: votedRecipes})
        
    } catch(err) {res.json(err);}
    
}

export const getRecipeID = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        res.json({recipe});
        
    } catch(err) {res.json(err);}
    
}




