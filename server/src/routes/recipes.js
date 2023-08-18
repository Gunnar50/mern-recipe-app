import express from "express";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";
import { authMiddleware } from "../middleware/authMiddleware.js";
import { getAllRecipes, createRecipe } from "../controllers/recipesController.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.post("/create", createRecipe)

export {router as recipesRouter};