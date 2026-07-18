import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookingController } from "./booking.controller";
import { bookingValidationSchema } from "./booking.validation";

const router = express.Router();

// ─── Booking Routes ───────────────────────────────────────────────────────────
// Static routes MUST come before dynamic /:id routes.
//
// POST   /           → Create booking (student)
// GET    /           → Get my bookings (student)
// GET    /tutor      → Get tutor's bookings (tutor)
// GET    /:id        → Get booking by ID (any auth, ownership checked)
// PATCH  /:id        → Update booking status (tutor, ownership checked)
// ──────────────────────────────────────────────────────────────────────────────

router.post(
  "/",
  auth(UserRole.STUDENT),
  validateRequest(bookingValidationSchema.createBookingSchema),
  BookingController.createBooking,
);

router.get("/", auth(UserRole.STUDENT), BookingController.getMyBookings);

// ⚠️ /tutor MUST be before /:id — otherwise Express treats "tutor" as an id
router.get("/tutor", auth(UserRole.TUTOR), BookingController.getTutorBookings);

router.get("/:id", auth(), BookingController.getBookingById);

router.patch(
  "/:id",
  auth(UserRole.TUTOR),
  validateRequest(bookingValidationSchema.updateBookingStatusSchema),
  BookingController.updateStatus,
);

export const BookingRoutes = router;
