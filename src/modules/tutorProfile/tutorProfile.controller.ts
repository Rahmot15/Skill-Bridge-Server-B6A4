import { Request, Response } from "express";
import { TutorProfileService } from "./tutorProfile.service";

const getAllTutors = async (req: Request, res: Response) => {
  const result = await TutorProfileService.getAllTutors();

  res.json({
    success: true,
    data: result,
  });
};

const getSingleTutor = async (req: Request, res: Response) => {
  const { id } = req.params;
  const result = await TutorProfileService.getSingleTutor(id as string);

  res.json({
    success: true,
    data: result,
  });
};

export const TutorProfileController = {
  getAllTutors,
  getSingleTutor,
};
