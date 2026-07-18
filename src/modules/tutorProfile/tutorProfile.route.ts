import express from "express";
import { TutorProfileController } from "./tutorProfile.controller";
import auth, { UserRole } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { tutorProfileValidationSchema } from "./tutorProfile.validation";

const router = express.Router();

// ─── Tutor Profile Routes ─────────────────────────────────────────────────────
// Static routes MUST come before dynamic /:id routes.
// Express matches top-down, first match wins.
//
// POST   /                   → Create tutor profile
// GET    /                   → List all tutors (public)
// GET    /me                 → Get own profile (authenticated tutor)
// GET    /:id                → Get single tutor by ID (public)
// PUT    /profile            → Update tutor profile
// PUT    /availability       → Update availability
// ──────────────────────────────────────────────────────────────────────────────

router.post(
  "/",
  auth(UserRole.TUTOR),
  validateRequest(tutorProfileValidationSchema.createTutorProfileSchema),
  TutorProfileController.createTutorProfile,
);

router.get("/", TutorProfileController.getAllTutors);

// ⚠️ /me MUST be before /:id — otherwise Express treats "me" as an id
router.get(
  "/me",
  auth(UserRole.TUTOR),
  TutorProfileController.getMyTutorProfile,
);

router.get("/:id", TutorProfileController.getSingleTutor);

router.put(
  "/profile",
  auth(UserRole.TUTOR),
  validateRequest(tutorProfileValidationSchema.updateTutorProfileSchema),
  TutorProfileController.updateTutorProfile,
);

router.put(
  "/availability",
  auth(UserRole.TUTOR),
  validateRequest(tutorProfileValidationSchema.updateAvailabilitySchema),
  TutorProfileController.updateAvailability,
);

export const TutorProfileRoutes = router;
