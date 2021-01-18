import express from "express";
const router = express.Router();
// ADD CONTROLLER METHODS //
import {
  authUser,
  registerUser,
  getMyProfile,
  updateMyProfile,
  getAllUsers,
  updateUser,
  deleteUser,
} from "../Controllers/UserController.js";
import {
  privateRoutesFunc,
  superAdminFunc,
} from "../Middlewares/authMiddlewares.js";

router
  .route("/")
  .post(registerUser)
  .get(privateRoutesFunc, superAdminFunc, getAllUsers);
router.post("/login", authUser);
router
  .route("/profile")
  .get(privateRoutesFunc, getMyProfile)
  .put(privateRoutesFunc, updateMyProfile);
router
  .route("/:id")
  .delete(privateRoutesFunc, superAdminFunc, deleteUser)
  .put(privateRoutesFunc, superAdminFunc, updateUser);

export default router;
