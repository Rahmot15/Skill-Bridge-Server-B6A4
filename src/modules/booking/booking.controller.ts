import { Request, Response } from "express";
import catchAsync from "../../utils/catchAsync";
import { BookingService } from "./booking.service";

const createBooking = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await BookingService.createBooking(req.body, userId);

  res.status(201).json({
    success: true,
    message: "Booking created successfully",
    data: result,
  });
});

const getMyBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await BookingService.getMyBookings(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const getTutorBookings = catchAsync(async (req: Request, res: Response) => {
  const userId = req.user!.id;

  const result = await BookingService.getTutorBookings(userId);

  res.status(200).json({
    success: true,
    data: result,
  });
});

const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: string };

  const result = await BookingService.updateBookingStatus(id as string, status as any);

  res.status(200).json({
    success: true,
    message: "Booking status updated",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  updateStatus,
};
