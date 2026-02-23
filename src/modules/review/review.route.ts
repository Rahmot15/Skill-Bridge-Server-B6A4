import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.STUDENT), ReviewController.createReview);

export const ReviewRoutes = router;
