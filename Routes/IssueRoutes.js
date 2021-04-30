import express from "express";
const router = express.Router();
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";
import {
  createIssue,
  deleteIssue,
  getMyIssues,
  updateIssue,
} from "../Controllers/IssueController.js";

router.route("/:projectId").post(privateRoutesFunc, createIssue);

router.route("/myIssues").get(privateRoutesFunc, getMyIssues);

router
  .route("/:issueId")
  .put(privateRoutesFunc, updateIssue)
  .delete(privateRoutesFunc, deleteIssue);

export default router;
