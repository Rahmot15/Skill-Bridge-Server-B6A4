import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { CategoryController } from "./category.controller";
import { strictLimiter } from "../../middlewares/rateLimiter";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), strictLimiter, CategoryController.createCategory);
router.get("/", CategoryController.getAllCategories);

export const CategoryRoutes = router;
