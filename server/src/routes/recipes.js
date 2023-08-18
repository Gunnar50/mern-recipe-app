import express from "express.js";
import mongoose from "mongoose";
import { RecipeModel } from "../models/Recipes.js";

const router = express.Router();



export {router as recipesRouter};