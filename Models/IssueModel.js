import mongoose, { Mongoose } from "mongoose";

const IssueSchema = mongoose.Schema({
  about: {
    type: String,
    maxLength: 500,
    required: true,
  },
  approved: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  deadline: {
    type: String,
  },
  location: {
    type: String,
    required: true,
  },
  notes: [
    {
      note: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    },
  ],
  project: {
    type: Mongoose.Schema.Types.ObjectId,
    ref: "Project",
  },
  status: {
    type: Number,
    min: 1,
    max: 3,
  },
  subTitle: {
    type: String,
    maxLength: 50,
  },
  title: {
    type: String,
    maxLength: 100,
    required: true,
  },
  updated: {
    type: Date,
  },
});

const Issue = mongoose.model("Issue", IssueSchema);
export default Issue;
