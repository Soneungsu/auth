import express, { Router } from "express";
import "express-async-errors";
import * as twitterController from "../controller/twitter.js";
import { verifyToken } from "../middleware/auth.js";

const router = express.Router();

router.get("/", verifyToken, twitterController.tweets);

router.get("/:id", verifyToken, twitterController.getTweetsId);

router.post("/", verifyToken, twitterController.createdUser);

router.put("/:id", verifyToken, twitterController.updatedPw);

router.delete("/:id", verifyToken, twitterController.deletedById);

export default router;
