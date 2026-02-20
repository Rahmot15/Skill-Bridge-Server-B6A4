import { Request, Response } from "express";
import { TutorProfileService } from "./tutorProfile.service";
import catchAsync from "../../utils/catchAsync";

const getAllTutors = catchAsync(async (req: Request, res: Response) => {
  const result = await TutorProfileService.getAllTutors();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getSingleTutor = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await TutorProfileService.getSingleTutor(id as string);

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const TutorProfileController = {
  getAllTutors,
  getSingleTutor,
};
