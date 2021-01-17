import mongoose from "mongoose";

const UserSchema = mongoose.Schema({
  aboutMe: {
    type: String,
    required: false,
    maxLength: 500,
  },
  created: {
    type: Date,
    default: Date.now(),
  },
  completedIssues: {
    type: Number,
    default: 0,
  },
  completedIssuesLow: {
    type: Number,
    default: 0,
  },
  completedIssuesMed: {
    type: Number,
    default: 0,
  },
  completedIssuesHigh: {
    type: Number,
    default: 0,
  },
  email: {
    type: String,
    required: true,
    minLength: 7,
  },
  firstName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 15,
  },
  isAdmin: {
    type: Boolean,
    default: false,
  },
  isSuperAdmin: {
    type: Boolean,
    default: false,
  },
  lastName: {
    type: String,
    required: true,
    minLength: 2,
    maxLength: 30,
  },
  myIssues: [
    {
      issue: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Issue",
      },
    },
  ],
  myNotes: [
    {
      note: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Note",
      },
    },
  ],
  myProjects: [
    {
      project: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Project",
      },
    },
  ],
  myTeams: [
    {
      team: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Team",
      },
    },
  ],
  nickName: {
    type: String,
    required: false,
    minLength: 2,
    maxLength: 10,
  },
  password: {
    type: String,
    required: true,
    minLength: 6,
    maxLength: 30,
  },
  username: {
    type: String,
    required: true,
    minLength: 5,
    maxLength: 30,
  },
  userImage: {
    type: Buffer,
    contentType: String,
  },
});

const User = mongoose.model("User", UserSchema);
export default User;
