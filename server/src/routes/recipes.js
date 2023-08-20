import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe, voteForRecipe, getVotedRecipes, getVotedRecipesIDs, getRecipeID, getOwnRecipes, deleteRecipe, updateRecipe } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.put("/", voteForRecipe)
router.post("/create", createRecipe)
router.get("/get-recipes/:id", getVotedRecipesIDs)
router.get("/get-voted-recipes/:id", getVotedRecipes)
router.get("/get-recipe/:recipeid", getRecipeID)
router.put("/update/:recipeid", updateRecipe)
router.get("/:userid", getOwnRecipes)
router.delete("/del/:id", deleteRecipe)

export {router as recipesRouter};