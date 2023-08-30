import express from "express";
import { createComment, createRecipe, deleteRecipe, getAllRecipes, getOwnRecipes, getRecipeID, getVotedRecipes, getVotedRecipesIDs, updateRecipe, voteForRecipe } from "../controllers/recipesController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", getAllRecipes)
router.get("/get-recipes/:id", getVotedRecipesIDs)
router.get("/get-voted-recipes/:id", getVotedRecipes)
router.get("/get-recipe/:recipeid", getRecipeID)
router.get("/:userid", authMiddleware, getOwnRecipes)
router.put("/", authMiddleware, voteForRecipe)
router.put("/update/:recipeid", authMiddleware, updateRecipe)
router.post("/create", authMiddleware, createRecipe)
router.post("/:recipeid", authMiddleware, createComment)
router.delete("/del/:id", authMiddleware, deleteRecipe)

export { router as recipesRouter };

