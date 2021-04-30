import asyncHandler from "express-async-handler";
import Note from "../Models/NoteModel.js";
import Project from "../Models/ProjectModel.js";
import Issue from "../Models/IssueModel.js";
import Team from "../Models/TeamModel.js";

// Create a Note
const createNote = asyncHandler(async (req, res) => {
  const { body } = req.body;
  const user = req.user._id;

  const issue = await Issue.findById(req.params.issueId);
  const project = await Project.findById(issue.project);
  const team = await Team.findById(project.team);

  if (issue && team.members.includes(user)) {
    if (body.length > 0) {
      const note = new Note({
        body,
        creator: user,
        project: req.params.issueId,
      });

      const createdNote = await note.save();
      issue.notes = [...issue.notes, createdNote._id];
      issue.updated = Date.now();
      await note.save();

      res.status(201).json(createdNote);
    } else {
      throw new Error("Please fill in the note!");
      return;
    }
  } else {
    throw new Error(
      "You do not have permission to create a note on this issue"
    );
    return;
  }
});

// Get My Notes
const getMyNotes = asyncHandler(async (req, res) => {
  const myNotes = await Issue.find({ creator: req.user._id });

  if (myNotes) {
    res.json(myNotes);
  } else {
    throw new Error("No Notes found!");
    return;
  }
});

// Update Note
const updateNote = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const note = await Note.findById(req.params.noteId);
  const issue = await Issue.findById(note.issue);

  // Note is found and the user has permissions to update it freely
  if (issue && note && note.creator.equals(user)) {
    note.body = req.body.body || note.body;
    note.updated = Date.now();

    const updatedNote = await note.save();

    res
      .json({
        body: updatedNote.body,
        updated: updatedNote.updated,
      })
      .status(204);
  } else {
    res.status(404);
    throw new Error("You do not have permissions to change this note");
    return;
  }
});

// Delete Note
const deleteNote = asyncHandler(async (req, res) => {
  const user = req.user._id;
  const note = await Note.findById(req.params.noteId);
  const issue = await Issue.findById(note.issue);
  const project = await Project.findById(issue.project);

  // checks to see if the user has permission to delete the Note
  if (issue && note && note.creator.equals(user)) {
    const idx = issue.notes.indexOf(req.params.noteId);
    issue.notes.splice(idx, 1);
    issue.notes = issue.notes;
    issue.updated = Date.now();
    await issue.save();

    if (note && note.creator.equals(user)) {
      await note.remove();
      res.json({ message: "Note was deleted successfully" }).status(204);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
    // Checks to see if the user has permission in the project to delete the Note
  } else if (
    issue &&
    note &&
    !note.creator.equals(user) &&
    project.permissions.includes(user)
  ) {
    const idx = issue.notes.indexOf(req.params.noteId);
    issue.notes.splice(idx, 1);
    issue.notes = issue.notes;
    issue.updated = Date.now();
    await issue.save();

    if (note) {
      await note.remove();
      res.json({ message: "Note was deleted successfully" }).status(204);
    } else {
      res.status(404);
      throw new Error("Note not found");
    }
  } else {
    res.status(404);
    throw new Error("Issue not found");
  }
});

export { createNote, getMyNotes, updateNote, deleteNote };
