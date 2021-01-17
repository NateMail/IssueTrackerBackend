import mongoose, { Mongoose } from "mongoose";

const ProjectSchema = mongoose.Schema({
  about: {
    type: String,
    required: true,
    maxLength: 1000,
  },
  completed: {
    type: Boolean,
    default: false,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  creator: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  image: {
    type: Buffer,
    contentType: String,
  },
  issues: [
    {
      issue: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    },
  ],
  name: {
    type: String,
    requied: true,
    maxLength: 200,
  },
  permissions: [
    {
      hasPermissions: {
        type: Mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    },
  ],
  team: {
    type: Mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Team",
  },
  updated: {
    type: Date,
  },
});

const Project = mongoose.model("Project", ProjectSchema);
export default Project;
