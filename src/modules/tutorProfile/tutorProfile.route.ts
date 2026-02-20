import express from "express";
import { TutorProfileController } from "./tutorProfile.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.TUTOR),
  TutorProfileController.createTutorProfile,
);
router.get("/", auth(UserRole.LEARNER), TutorProfileController.getAllTutors);
router.get("/:id", TutorProfileController.getSingleTutor);

export const TutorProfileRoutes = router;
