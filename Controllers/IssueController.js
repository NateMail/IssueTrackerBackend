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

// Get My Issues
const getMyIssues = asyncHandler(async (req, res) => {
  const myIssues = await Issue.find({ creator: req.user._id });

  if (myIssues) {
    res.json(myIssues);
  } else {
    throw new Error("No Issues found!");
    return;
  }
});

// Update Issue
const updateIssue = asyncHandler(async (req, res) => {
  const issue = await Issue.findById(req.params.issueId);
  const project = await Project.findById(req.params.projectId);
  const user = req.user._id;

  // project is found and the user has permissions to update it freely
  if (
    project &&
    project.permissions.includes(user) &&
    issue.creator.equals(user)
  ) {
    issue.about = req.body.about || issue.about;
    issue.approved = req.body.approved || issue.approved;
    issue.completed = req.body.completed || issue.completed;
    issue.deadline = req.body.deadline || issue.deadline;
    issue.location = req.body.location || issue.location;
    issue.status = req.body.status || issue.status;
    issue.notes = req.body.notes || issue.notes;
    issue.title = req.body.title || issue.title;
    issue.subTitle = req.body.subTitle || issue.subTitle;
    issue.updated = Date.now();

    const updatedIssue = await issue.save();

    res
      .json({
        about: updatedIssue.about,
        approved: updatedIssue.approved,
        completed: updatedIssue.completed,
        deadline: updatedIssue.deadline,
        status: updatedIssue.status,
        location: updatedIssue.location,
        notes: updatedIssue.notes,
        title: updatedIssue.title,
        subTitle: updatedIssue.subTitle,
        updated: updatedIssue.updated,
      })
      .status(204);
  } else if (
    // Allows a user with permissions to update any issue
    project &&
    project.permissions.includes(user) &&
    !issue.creator.equals(user)
  ) {
    issue.about = req.body.about || issue.about;
    issue.approved = req.body.approved || issue.approved;
    issue.completed = req.body.completed || issue.completed;
    issue.deadline = req.body.deadline || issue.deadline;
    issue.location = req.body.location || issue.location;
    issue.status = req.body.status || issue.status;
    issue.notes = req.body.notes || issue.notes;
    issue.title = req.body.title || issue.title;
    issue.subTitle = req.body.subTitle || issue.subTitle;
    issue.updated = Date.now();

    const updatedIssue = await issue.save();

    res
      .json({
        about: updatedIssue.about,
        approved: updatedIssue.approved,
        completed: updatedIssue.completed,
        deadline: updatedIssue.deadline,
        status: updatedIssue.status,
        location: updatedIssue.location,
        notes: updatedIssue.notes,
        title: updatedIssue.title,
        subTitle: updatedIssue.subTitle,
        updated: updatedIssue.updated,
      })
      .status(204);
    // Allows the user to update the fields they can
  } else if (issue && issue.creator.equals(user)) {
    issue.about = req.body.about || issue.about;
    issue.location = req.body.location || issue.location;
    issue.notes = req.body.notes || issue.notes;
    issue.title = req.body.title || issue.title;
    issue.subTitle = req.body.subTitle || issue.subTitle;
    issue.updated = Date.now();

    const updatedIssue = await issue.save();

    res
      .json({
        about: updatedIssue.about,
        location: updatedIssue.location,
        notes: updatedIssue.notes,
        title: updatedIssue.title,
        subTitle: updatedIssue.subTitle,
        updated: updatedIssue.updated,
      })
      .status(204);
  } else {
    res.status(404);
    throw new Error("You do not have permissions to change this issue");
    return;
  }
});

export { createIssue, getMyIssues, updateIssue };
