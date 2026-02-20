import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.createCategory(req.body);

  res.status(201).json({
    success: true,
    message: "Category created successfully",
    data: result,
  });
});

const getAllCategories = catchAsync(async (req: Request, res: Response) => {
  const result = await CategoryService.getAllCategories();

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const CategoryController = {
  createCategory,
  getAllCategories,
};
