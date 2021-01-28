import express from "express";
const router = express.Router();
import { createProject } from "../Controllers/ProjectController.js";
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";

router.route("/:teamId").post(privateRoutesFunc, createProject);

export default router;
