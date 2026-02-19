import express from "express";
import { TutorProfileController } from "./tutorProfile.controller";

const router = express.Router();

router.get("/", TutorProfileController.getAllTutors);
router.get("/:id", TutorProfileController.getSingleTutor);

export const TutorProfileRoutes = router;
