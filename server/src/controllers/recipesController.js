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
        const recipe = await RecipeModel.findById(req.params.recipeid).populate("creator", "username").exec();
        res.json({recipe});
        
    } catch(err) {res.json(err);}
    
}

export const getOwnRecipes = async (req, res) => {
    try {
        const recipes = await RecipeModel.find({creator: req.params.userid}).populate("creator", "username").exec();
        res.json({recipes});
        
    } catch(err) {res.json(err);}
    
}

export const deleteRecipe = async (req, res) => {
    try {
        const recipeID = req.params.id;
        // remove the recipe object
        const result = await RecipeModel.findByIdAndDelete(recipeID);
        
        // remove the recipe from the voted list in any user that voted for this recipe
        await UserModel.updateMany({votedRecipes: recipeID}, {$pull: {votedRecipes: recipeID}});
        
        res.json(result);
        
    } catch(err) {res.json(err);}
    
}

export const updateRecipe = async (req, res) => {
    try {
        const recipeID = req.params.recipeid;
        const recipe = req.body;
        const result = await RecipeModel.findByIdAndUpdate(recipeID, recipe, {new:true});
        
        
        res.json(result);
        
    } catch(err) {res.json(err);}
    
}




