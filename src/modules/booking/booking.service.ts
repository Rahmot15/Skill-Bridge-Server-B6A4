import { BookingStatus } from "../../../generated/prisma/enums";
import { prisma } from "../../lib/prisma";

const createBooking = async (payload: any, userId: string) => {
  return prisma.booking.create({
    data: {
      studentId: userId,
      tutorId: payload.tutorId,
      categoryId: payload.categoryId,
      message: payload.message,
      date: payload.date,
    },
  });
};

const getMyBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      studentId: userId,
    },
    include: {
      tutor: true,
      category: true,
    },
  });
};

const getTutorBookings = async (userId: string) => {
  return prisma.booking.findMany({
    where: {
      tutorId: userId,
    },
    include: {
      student: true,
      category: true,
    },
  });
};

const getBookingById = async (id: string) => {
  return prisma.booking.findUnique({
    where: { id },
    include: {
      student: true,
      tutor: true,
      category: true,
    },
  });
};

const updateBookingStatus = async (id: string, status: BookingStatus) => {
  return prisma.$transaction(async (tx) => {
    // 1. Update booking status
    const booking = await tx.booking.update({
      where: { id },
      data: { status },
    });

    // 2. Always recalculate completedSessions for this tutor
    const approvedCount = await tx.booking.count({
      where: { tutorId: booking.tutorId, status: "APPROVED" },
    });

    await tx.tutorProfile.update({
      where: { userId: booking.tutorId },
      data: { completedSessions: approvedCount },
    });

    return booking;
  });
};

export const BookingService = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  getBookingById,
  updateBookingStatus,
};
