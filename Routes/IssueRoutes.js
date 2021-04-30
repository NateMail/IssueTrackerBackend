import express from "express";
const router = express.Router();
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";
import { createIssue, getMyIssues } from "../Controllers/IssueController.js";

router.route("/:projectId").post(privateRoutesFunc, createIssue);

router.route("/myIssues").get(privateRoutesFunc, getMyIssues);

export default router;
