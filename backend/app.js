import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./src/infra/db.js";

import { registerRoutes } from "./src/routes/registerRoutes.js";

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());
mongoose.set("strictQuery", false);

app.use(
  cors({
    exposedHeaders: ["auth-token"],
  })
);

app.use(
  // Added to capture user email
  express.urlencoded({
    extended: true,
  })
);
//Connecting whith the database
connectDB();
app.get("/", async (req, res) => {
  res.status(200).send({ message: "API is ready to go!" });
});

// Routes
registerRoutes(app)

app.listen(PORT, () => {
  console.log(`API ready to use in -> localhost:${PORT}`);
});