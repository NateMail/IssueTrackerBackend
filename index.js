import express from "express";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./Config/db.js";

// Route Imports
import userRoutes from "./Routes/UserRoutes.js";
import teamRoutes from "./Routes/TeamRoutes.js";
import projectRoutes from "./Routes/ProjectRoutes.js";
import issueRoutes from "./Routes/IssueRoutes.js";

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
app.use(express.json());
app.use(cors());
app.use("/api/users", userRoutes);
app.use("/api/team", teamRoutes);
app.use("/api/project", projectRoutes);
app.use("/api/issues", issueRoutes);

const PORT = process.env.PORT || 7000;
app.listen(PORT, () => {
  console.log(`App listening on port: ${PORT}`);
});
