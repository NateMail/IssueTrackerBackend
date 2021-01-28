import asyncHandler from "express-async-handler";
import Project from "../Models/ProjectModel.js";
import Team from "../Models/TeamModel.js";

// Create a project

const createProject = asyncHandler(async (req, res) => {
  const { about, name } = req.body;
  const user = req.user._id;

  const team = await Team.findById(req.params.teamId);

  if (team && team.creator.equals(user)) {
    if (name.length > 0 && about.length > 0) {
      const project = new Project({
        about,
        name,
        creator: user,
        permissions: [user],
        team: req.params.teamId,
      });
      const createdProject = await project.save();

      res.status(201).json(createdProject);
    } else {
      throw new Error("About and Name fields required");
      return;
    }
  } else {
    throw new Error("You must be the creator of the team to create a project");
    return;
  }
});

export { createProject };
