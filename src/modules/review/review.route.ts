import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { ReviewController } from "./review.controller";

const router = express.Router();

router.post("/", auth(UserRole.STUDENT), ReviewController.createReview);

router.get("/tutor/:tutorId", ReviewController.getTutorReviews);

export const ReviewRoutes = router;
