import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { ReviewService } from "./review.service";

const createReview = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await ReviewService.createReview(req.body, userId);

  res.status(201).json({
    success: true,
    message: "Review created successfully",
    data: result,
  });
});

export const ReviewController = {
  createReview,
};
