import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { AdminController } from "./admin.controller";

const router = express.Router();

router.get("/users", auth(UserRole.ADMIN), AdminController.getAllUsers);

router.patch("/users/:id", auth(UserRole.ADMIN), AdminController.updateUserStatus);

router.get("/bookings", auth(UserRole.ADMIN), AdminController.getAllBookings);

export const AdminRoutes = router;
