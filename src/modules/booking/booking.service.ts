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

const updateBookingStatus = async (id: string, status: BookingStatus) => {
  return prisma.booking.update({
    where: { id },
    data: { status },
  });
};

export const BookingService = {
  createBooking,
  getMyBookings,
  getTutorBookings,
  updateBookingStatus,
};
