import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe, voteForRecipe, getSavedRecipes, getSavedRecipesIDs } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.put("/", voteForRecipe)
router.post("/create", authMiddleware, createRecipe)
router.get("/get-recipes/:id", getSavedRecipesIDs)
router.get("/get-recipes", getSavedRecipes)

export {router as recipesRouter};