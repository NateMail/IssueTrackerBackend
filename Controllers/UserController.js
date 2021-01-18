import asyncHandler from "express-async-handler";
import generateToken from "../Utils/index.js";
import User from "../Models/UserModel.js";

// Authenticate the User
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  user.populate("myIssues");
  user.populate({
    path: "myNotes",
    populate: {
      path: "body",
    },
  });
  user.populate("myProjects");
  user.populate("myTeams");
  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
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

export { registerUser };
