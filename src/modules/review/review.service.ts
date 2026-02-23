import { prisma } from "../../lib/prisma";

const createReview = async (payload: any, userId: string) => {
  return prisma.review.create({
    data: {
      rating: payload.rating,
      comment: payload.comment,
      tutorId: payload.tutorId,
      bookingId: payload.bookingId,
      studentId: userId,
    },
  });
};

export const ReviewService = {
  createReview,
};
