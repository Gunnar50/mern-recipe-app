import express from "express";
import { getCurrentUser, loginUser, registerUser, verifyToken } from "../controllers/userController.js";
import { authMiddleware } from "../middleware/authMiddleware.js";


const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);
router.get("/verify-token", authMiddleware, verifyToken); // applied the middleware before the verifyToken controller
router.get("/user/:id", authMiddleware, getCurrentUser);

export { router as userRouter };


