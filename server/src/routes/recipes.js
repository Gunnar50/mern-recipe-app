import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe, saveRecipe, getSavedRecipes, getSavedRecipesIDs } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.post("/create", authMiddleware, createRecipe)
router.post("/save", saveRecipe)
router.get("/get-recipes/ids", getSavedRecipesIDs)
router.get("/get-recipes", getSavedRecipes)

export {router as recipesRouter};