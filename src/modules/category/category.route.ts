import express from "express";
import auth, { UserRole } from "../../middlewares/auth";
import { CategoryController } from "./category.controller";

const router = express.Router();

router.post("/", auth(UserRole.ADMIN), CategoryController.createCategory);

export const CategoryRoutes = router;
