import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { AdminService } from "./admin.service";

const getAllUsers = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllUsers();

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateUserStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;

  const result = await AdminService.updateUserStatus(id as string, req.body);

  res.status(200).json({
    success: true,
    message: "User updated successfully",
    data: result,
  });
});

const getAllBookings = catchAsync(async (req: Request, res: Response) => {
  const result = await AdminService.getAllBookings();

  res.status(200).json({
    success: true,
    data: result,
  });
});

export const AdminController = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
