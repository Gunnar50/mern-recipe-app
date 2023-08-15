import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import { userRouter } from "./routes/users.js";

const app = express();

app.use(express.json());  // when sending data from the frontend it will convert into json automatically
app.use(cors());
app.use("/auth", userRouter);

mongoose.connect(process.env.MONGO_URI);

app.listen(process.env.PORT, () => console.log("SERVER STARTED"));




