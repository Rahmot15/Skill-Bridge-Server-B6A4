import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { AdminController } from "./admin.controller";
import { adminValidationSchema } from "./admin.validation";

const router = express.Router();

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUsers);

router.patch(
  "/users/:id",
  auth(UserRole.ADMIN),
  validateRequest(adminValidationSchema.updateUserStatusSchema),
  AdminController.updateUserStatus,
);

router.get("/bookings", auth(UserRole.ADMIN), AdminController.getAllBookings);

router.get("/stats", auth(UserRole.ADMIN), AdminController.getDashboardStats);

export const AdminRoutes = router;
