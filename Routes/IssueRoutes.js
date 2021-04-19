import express from "express";
const router = express.Router();
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";
import { createIssue } from "../Controllers/IssueController.js";

router.route("/:projectId").post(privateRoutesFunc, createIssue);

export default router;
