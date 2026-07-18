import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { ReviewController } from "./review.controller";
import { reviewValidationSchema } from "./review.validation";
import { strictLimiter } from "../../middlewares/rateLimiter";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.STUDENT),
  strictLimiter,
  validateRequest(reviewValidationSchema.createReviewSchema),
  ReviewController.createReview,
);

router.get("/tutor/:tutorId", ReviewController.getTutorReviews);

export const ReviewRoutes = router;
