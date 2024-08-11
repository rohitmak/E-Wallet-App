import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
} from "../controllers/user.controllers.js";

const router = express.Router();

router.route("/signup").post(registerUser);
router.route("/signin").post(loginUser);
router.route("/:id").put(authMiddleware, updateUser);
router.route("/bulk").get(authMiddleware, getAllUsers);

export default router;
