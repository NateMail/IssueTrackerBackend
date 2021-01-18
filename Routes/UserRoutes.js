import express from "express";
const router = express.Router();
// ADD CONTROLLER METHODS //
import { registerUser } from "../Controllers/UserController.js";

router
  .route("/")
  .post(registerUser)
  .get(/* protected route, superAdmin, getAllUsers */);
router.post("/login" /* authenticate user */);
router
  .route("/profile")
  .get(/* protect route, get users profile */)
  .put(/* protect, user update method */);
router
  .route("/:id")
  .delete(/* protect, superAdmin, delete method */)
  .get(/*protect, superAdmin, get Specific user */)
  .put(/* protect, superAdmin, updateUser */);

export default router;
