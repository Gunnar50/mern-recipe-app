import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe, voteForRecipe, getVotedRecipes, getVotedRecipesIDs, getRecipeID } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.put("/", voteForRecipe)
router.post("/create", authMiddleware, createRecipe)
router.get("/get-recipes/:id", getVotedRecipesIDs)
router.get("/get-voted-recipes/:id", getVotedRecipes)
router.post("/id", getRecipeID)

export {router as recipesRouter};