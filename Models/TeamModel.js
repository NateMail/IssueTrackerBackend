import mongoose from "mongoose";

// Add a leader or solo field?
const TeamSchema = mongoose.Schema({
  about: {
    type: String,
    required: true,
    maxLength: 500,
  },
  addRequests: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  banned: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  completedProjects: {
    type: Number,
    default: 0,
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
  image: {
    type: Buffer,
    contentType: String,
  },
  name: {
    type: String,
    required: true,
    maxLength: 50,
  },
  members: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  updated: {
    type: Date,
  },
});

const Team = mongoose.model("Team", TeamSchema);
export default Team;
