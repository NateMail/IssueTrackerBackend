import asyncHandler from "express-async-handler";
import Team from "../Models/TeamModel.js";

// Create Team
const createTeam = asyncHandler(async (req, res) => {
  const { about, name, members } = req.body;

  if (members && members.length === 0) {
    res.status(400);
    throw new Error("No Team Members");
    return;
  } else {
    const team = new Team({
      about,
      name,
      members,
      creator: req.user._id,
    });
    const createdTeam = await team.save();

    res.status(201).json(createdTeam);
  }
});

// Get My Teams
const myTeams = asyncHandler(async (req, res) => {
  const myTeams = await Team.find({ creator: req.params.userId });

  if (myTeams) {
    res.json(myTeams);
  } else {
    throw new Error("Teams not found!");
  }
});

// Update Team
const updateMyTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.teamId);

  if (team && team.creator.equals(req.user._id) && team.members.length > 0) {
    team.about = req.body.about || team.about;
    team.addRequests = req.body.addRequests || team.addRequests;
    team.banned = req.body.banned || team.banned;
    team.completedProjects =
      req.body.completedProjects || team.completedProjects;
    team.name = req.body.name || team.name;
    team.members = req.body.members || team.members;
    team.projects = req.body.projects || team.projects;
    team.updated = Date.now();

    const updatedTeam = await team.save();

    res
      .json({
        about: updatedTeam.about,
        addRequests: updatedTeam.addRequests,
        banned: updatedTeam.banned,
        completedProjects: updatedTeam.completedProjects,
        name: updatedTeam.name,
        members: updatedTeam.members,
        projects: updatedTeam.projects,
        updated: updatedTeam.updated,
      })
      .status(204);
  } else {
    res.status(404);
    throw new Error("Team not found");
  }
});

// Delete Team
const deleteMyTeam = asyncHandler(async (req, res) => {
  const team = await Team.findById(req.params.teamId);

  if (team && team.creator.equals(req.user._id)) {
    await team.remove();
    res.json({ message: "Team was deleted successfully" }).status(204);
  } else {
    res.status(404);
    throw new Error("Team was not found");
  }
});

export { createTeam, myTeams, updateMyTeam, deleteMyTeam };
