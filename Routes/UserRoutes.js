import express from "express";
const router = express.Router();
// ADD CONTROLLER METHODS //
import {
  authUser,
  registerUser,
  getMyProfile,
} from "../Controllers/UserController.js";
import { privateRoutesFunc } from "../Middlewares/protectedRoutes.js";

router
  .route("/")
  .post(registerUser)
  .get(/* protected route, superAdmin, getAllUsers */);
router.post("/login", authUser);
router
  .route("/profile")
  .get(privateRoutesFunc, getMyProfile)
  .put(/* protect, user update method */);
router
  .route("/:id")
  .delete(/* protect, superAdmin, delete method */)
  .get(/*protect, superAdmin, get Specific user */)
  .put(/* protect, superAdmin, updateUser */);

export default router;
