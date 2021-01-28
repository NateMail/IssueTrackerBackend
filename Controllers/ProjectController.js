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

// Get My Projects
const getMyProjects = asyncHandler(async (req, res) => {
  const myProjects = await Project.find({ creator: req.user._id });

  if (myProjects) {
    res.json(myProjects);
  } else {
    throw new Error("No Projects found!");
    return;
  }
});

// Update Project
const updateProject = asyncHandler(async (req, res) => {
  const project = await Project.findById(req.params.projectId);
  const user = req.user._id;

  if (project && project.creator.equals(user)) {
    project.about = req.body.about || project.about;
    project.completed = req.body.completed || project.completed;
    project.issues = req.body.issues || project.issues;
    project.name = req.body.name || project.name;
    project.permissions = req.body.permissions || project.permissions;
    project.updated = Date.now();

    const updatedProject = await project.save();

    res
      .json({
        about: updatedProject.about,
        completed: updatedProject.completed,
        issues: updatedProject.issues,
        name: updatedProject.name,
        permissions: updatedProject.permissions,
        updated: updatedProject.updated,
      })
      .status(204);
  } else if (
    project &&
    project.permissions.includes(user) &&
    !project.creator.equals(user)
  ) {
    project.about = req.body.about || project.about;
    project.issues = req.body.issues || project.issues;
    project.name = req.body.name || project.name;
    project.updated = Date.now();

    const updatedProject = await project.save();

    res
      .json({
        about: updatedProject.about,
        issues: updatedProject.issues,
        name: updatedProject.name,
        updated: updatedProject.updated,
      })
      .status(204);
  } else {
    res.status(404);
    throw new Error("You do not have permissions to change this project");
    return;
  }
});

export { createProject, getMyProjects, updateProject };
