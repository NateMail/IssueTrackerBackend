import mongoose from "mongoose";
import bcrypt from "bcrypt";

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
      type: mongoose.Schema.Types.ObjectId,
      ref: "Issue",
    },
  ],
  myNotes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  myProjects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  myTeams: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Team",
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
  },
  username: {
    type: String,
    required: true,
    minLength: 3,
    maxLength: 30,
  },
  userImage: {
    type: Buffer,
    contentType: String,
  },
  updated: {
    type: Date,
  },
});

UserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) {
    next();
  }

  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

const User = mongoose.model("User", UserSchema);
export default User;
