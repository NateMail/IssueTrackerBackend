import express from "express";
const router = express.Router();
import { privateRoutesFunc } from "../Middlewares/authMiddlewares.js";
import {
  createNote,
  getMyNotes,
  updateNote,
  deleteNote,
} from "../Controllers/NoteController.js";

router.route("/:issueId").post(privateRoutesFunc, createNote);

router.route("/myNotes").get(privateRoutesFunc, getMyNotes);

router
  .route("/:noteId")
  .put(privateRoutesFunc, updateNote)
  .delete(privateRoutesFunc, deleteNote);

export default router;
