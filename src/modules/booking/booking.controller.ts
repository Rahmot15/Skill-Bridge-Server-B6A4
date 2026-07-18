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


const getBookingById = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const userRole = req.user!.role;

  const result = await BookingService.getBookingById(id as string);

  if (!result) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  // Ownership check: students can only see their own bookings,
  // tutors can only see bookings assigned to them, admins can see all
  if (userRole === "STUDENT" && result.studentId !== userId) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  if (userRole === "TUTOR" && result.tutorId !== userId) {
    return res.status(403).json({
      success: false,
      message: "Access denied",
    });
  }

  res.status(200).json({
    success: true,
    data: result,
  });
});


const updateStatus = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body as { status: string };
  const userId = req.user!.id;

  // Ownership check: only the assigned tutor can update booking status
  const booking = await BookingService.getBookingById(id as string);

  if (!booking) {
    return res.status(404).json({
      success: false,
      message: "Booking not found",
    });
  }

  if (booking.tutorId !== userId) {
    return res.status(403).json({
      success: false,
      message: "You can only update bookings assigned to you",
    });
  }

  const result = await BookingService.updateBookingStatus(id as string, status as any);

  res.status(200).json({
    success: true,
    message: "Booking status updated",
    data: result,
  });
});

const cancelBooking = catchAsync(async (req: Request, res: Response) => {
  const { id } = req.params;
  const userId = req.user!.id;
  const userRole = req.user!.role;

  const result = await BookingService.cancelBooking(id as string, userId, userRole);

  res.status(200).json({
    success: true,
    message: "Booking cancelled",
    data: result,
  });
});

export const BookingController = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  getBookingById,
  updateStatus,
  cancelBooking,
};
