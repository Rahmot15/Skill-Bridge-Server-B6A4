import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { BookingController } from "./booking.controller";

const router = express.Router();

router.post("/", auth(UserRole.STUDENT), BookingController.createBooking);

router.get("/", auth(UserRole.STUDENT), BookingController.getMyBookings);

router.get("/tutor", auth(UserRole.TUTOR), BookingController.getTutorBookings);

router.get("/:id", auth(), BookingController.getBookingById);

router.patch("/:id", auth(UserRole.TUTOR), BookingController.updateStatus);

export const BookingRoutes = router;
