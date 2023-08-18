import { RecipeModel } from "../models/Recipes.js";
import { UserModel } from "../models/Users.js";


export const getAllRecipes = async (req, res) => {
    try {
        const response = await RecipeModel.find({});
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

export const saveRecipe = async (req, res) => {
    try {
        const recipe = await RecipeModel.findById(req.body.recipeID);
        const user = await UserModel.findById(req.body.userID);
        user.savedRecipes.push(recipe);
        await user.save();
        res.json({savedRecipes: user.savedRecipes});
        
    } catch(err) {res.json(err);}

}




