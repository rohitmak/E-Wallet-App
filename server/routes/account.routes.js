import express from "express";
import authMiddleware from "../middlewares/auth.js";
import {
  getBalance,
  transferBalance,
} from "../controllers/account.controllers.js";

const router = express.Router();

router.route("/balance").get(authMiddleware, getBalance);
router.route("/transfer").post(authMiddleware, transferBalance);

export default router;
