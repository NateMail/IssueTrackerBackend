import express from "express";
const router = express.Router();
import {
  createTeam,
  myTeams,
  updateMyTeam,
  deleteMyTeam,
} from "../Controllers/TeamController.js";
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";

router.route("/").post(privateRoutesFunc, createTeam);

router.route("/:userId").get(privateRoutesFunc, myTeams);

router
  .route("/:teamId")
  .put(privateRoutesFunc, updateMyTeam)
  .delete(privateRoutesFunc, deleteMyTeam);

export default router;
