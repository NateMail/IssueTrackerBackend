import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

// Config .env file
dotenv.config();

// Initiating application
const app = express();

// Connect to DB
connectDB();

// Middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(cors());

const port = process.env.PORT || 7000;
app.listen(port, () => {
  `App listening on port: ${port}`;
});
