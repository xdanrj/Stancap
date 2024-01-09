import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import { connectDB } from "./src/infra/db.js";
import { userRoutes } from "./src/routes/userRoutes.js";
import { quotesRoutes } from "./src/routes/quotesRoutes.js";
import { loginAndRegisterRoutes } from "./src/routes/loginAndRegisterRoutes.js";
import requireToken from "./src/routes/middleware.js";

import dotenv from "dotenv"
dotenv.config()

const PORT = process.env.PORT || 3000;
const app = express();
app.use(express.json());

app.use(cors());
mongoose.set("strictQuery", false);

app.use(requireToken)

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

/*app.use(
  cors({
    exposedHeaders: ["auth-token"],
  })
);*/

app.use(
  // Added to capture user email
  express.urlencoded({
    extended: true,
  })
);

app.listen(PORT, () => {
  console.log(`API ready to use`);
});

//Connecting whith the database
connectDB();
app.get("/", async (req, res) => {
  res.status(200).send({ message: "API is ready to go!" });
});

// Routes
userRoutes(app)
quotesRoutes(app)
loginAndRegisterRoutes(app)