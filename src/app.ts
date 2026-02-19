import express, { Application } from "express";
import cors from "cors";
import { TutorProfileRoutes } from "./modules/tutorProfile/tutorProfile.route";
import { toNodeHandler } from "better-auth/node";
import { auth } from "./lib/auth";

const app: Application = express();
app.all("/api/auth/*splat", toNodeHandler(auth));

app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true,
  })
);

app.use(express.json());

app.use("/api/tutors", TutorProfileRoutes);

app.get("/", (req, res) => {
  res.send("SkillBridge API running...");
});

export default app;
