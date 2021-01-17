import mongoose from "mongoose";

const NoteSchema = mongoose.Schema({
  body: {
    type: String,
    required: true,
    trim: true,
    maxLength: 500,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  issue: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Issue",
  },
  updated: {
    type: Date,
  },
});

const Note = mongoose.model("Note", NoteSchema);
export default Note;
