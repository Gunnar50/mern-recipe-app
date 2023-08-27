import express from "express";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe, voteForRecipe, getVotedRecipes, getVotedRecipesIDs, getRecipeID, getOwnRecipes, deleteRecipe, updateRecipe, createComment } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.get("/get-recipes/:id", getVotedRecipesIDs)
router.get("/get-voted-recipes/:id", getVotedRecipes)
router.get("/get-recipe/:recipeid", getRecipeID)
router.get("/:userid", getOwnRecipes)
router.put("/", voteForRecipe)
router.put("/update/:recipeid", updateRecipe)
router.post("/create", createRecipe)
router.post("/:recipeid", createComment)
router.delete("/del/:id", deleteRecipe)

export {router as recipesRouter};