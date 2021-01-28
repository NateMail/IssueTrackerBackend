import express from "express";
const router = express.Router();
import {
  createProject,
  getMyProjects,
  updateProject,
} from "../Controllers/ProjectController.js";
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";

router.route("/:teamId").post(privateRoutesFunc, createProject);

router.route("/myProjects").get(privateRoutesFunc, getMyProjects);

router.route("/:projectId").put(privateRoutesFunc, updateProject);

export default router;
