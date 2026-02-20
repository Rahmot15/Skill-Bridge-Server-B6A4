import express, { Application } from "express";
import cors from "cors";
import { TutorProfileRoutes } from "./modules/tutorProfile/tutorProfile.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";
import errorHandler from "./middlewares/errorHandler";
import notFound from "./middlewares/notFound";
import { CategoryRoutes } from "./modules/category/category.route";
import { BookingRoutes } from "./modules/booking/booking.route";

const app: Application = express();
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
  cors({
    origin: process.env.APP_URL || "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/tutors", TutorProfileRoutes);

app.use("/api/categories", CategoryRoutes);

app.use("/api/bookings", BookingRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API running...");
});

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

export default app;
