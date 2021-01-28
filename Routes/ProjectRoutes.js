import express from "express";
const router = express.Router();
import {
  createProject,
  getMyProjects,
} from "../Controllers/ProjectController.js";
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";

router.route("/:teamId").post(privateRoutesFunc, createProject);

router.route("/myProjects").get(privateRoutesFunc, getMyProjects);

export default router;
