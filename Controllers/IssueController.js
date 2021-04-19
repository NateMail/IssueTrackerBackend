import asyncHandler from "express-async-handler";
import Project from "../Models/ProjectModel.js";
import Issue from "../Models/IssueModel.js";

const createIssue = asyncHandler(async (req, res) => {
  const { about, location, title } = req.body;
  const user = req.user._id;

  const project = await Project.findById(req.params.projectId);

  if (project && project.permissions.includes(user)) {
    if (about.length > 0 && location.length > 0 && title.length > 0) {
      const issue = new Issue({
        about,
        creator: user,
        location,
        title,
        project: req.params.projectId,
      });

      const createdIssue = await issue.save();
      project.issues = [...project.issues, createdIssue._id];
      project.updated = Date.now();
      await project.save();

      res.status(201).json(createdIssue);
    } else {
      throw new Error("About, Location, and Title fields required");
      return;
    }
  } else {
    throw new Error(
      "You do not have permission to create an issue on this project"
    );
    return;
  }
});

export { createIssue };
