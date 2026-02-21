import express from "express";
import { TutorProfileController } from "./tutorProfile.controller";
import auth, { UserRole } from "../../middlewares/auth";

const router = express.Router();

router.post(
  "/",
  auth(UserRole.TUTOR),
  TutorProfileController.createTutorProfile,
);
router.get("/", TutorProfileController.getAllTutors);
router.get("/:id", TutorProfileController.getSingleTutor);

router.put(
  "/profile",
  auth(UserRole.TUTOR),
  TutorProfileController.updateTutorProfile,
);

router.put(
  "/availability",
  auth(UserRole.TUTOR),
  TutorProfileController.updateAvailability,
);

export const TutorProfileRoutes = router;
