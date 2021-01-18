import asyncHandler from "express-async-handler";
import generateToken from "../Utils/index.js";
import User from "../Models/UserModel.js";

// Authenticate the User
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(401);
    throw new Error("Invalid Email or Password");
  }
});

// Register New User
const registerUser = asyncHandler(async (req, res) => {
  // firstname, lastname, email, password, username are all required fields
  const { firstName, lastName, email, password, username } = req.body;

  const userExists = await User.findOne({ email });

  if (userExists) {
    res.status(400);
    throw new Error("User already Exists");
  }

  const user = await User.create({
    firstName,
    lastName,
    email,
    password,
    username,
  });

  if (user) {
    res.status(201).json({
      _id: user._id,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username,
      email: user.email,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
      token: generateToken(user._id),
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// Get User Profile
const getMyProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);

  if (user) {
    user.populate("myIssues");
    user.populate("myNotes");
    user.populate("myProjects");
    user.populate("myTeams");
    res.json({
      aboutMe: user.aboutMe,
      created: user.created,
      completedIssues: user.completedIssues,
      completedIssuesLow: user.completedIssuesLow,
      completedIssuesMed: user.completedIssuesMed,
      completedIssuesHigh: user.completedIssuesHigh,
      email: user.email,
      firstName: user.firstName,
      isAdmin: user.isAdmin,
      isSuperAdmin: user.isSuperAdmin,
      lastName: user.lastName,
      username: user.username,
      userImage: user.userImage,
      nickName: user.nickName,
      myIssues: user.myIssues,
      myNotes: user.myNotes,
      myProjects: user.myProjects,
      myTeams: user.myTeams,
    });
  } else {
    res.status(404);
    throw new Error("User Not Found!");
  }
});
/*
      
*/

export { authUser, registerUser, getMyProfile };
