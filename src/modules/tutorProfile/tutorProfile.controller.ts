import { Request, Response } from "express";
import { TutorProfileService } from "./tutorProfile.service";
import catchAsync from "../../utils/catchAsync";

const createTutorProfile = catchAsync(async (req: Request, res: Response) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({
      success: false,
      message: "Unauthorized",
    });
  }

  const result = await TutorProfileService.createTutorProfile(
    user.id,
    req.body,
  );

  res.status(201).json({
    success: true,
    message: "Tutor profile created successfully",
    data: result,
  });
});

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

const updateTutorProfile = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await TutorProfileService.updateTutorProfile(
    userId,
    req.body
  );

  res.status(200).json({
    success: true,
    message: "Tutor profile updated",
    data: result,
  });
});

const updateAvailability = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await TutorProfileService.updateAvailability(
    userId,
    req.body.availability
  );

  res.status(200).json({
    success: true,
    message: "Availability updated",
    data: result,
  });
});

export const TutorProfileController = {
  createTutorProfile,
  getAllTutors,
  getSingleTutor,
  updateTutorProfile,
  updateAvailability,
};
