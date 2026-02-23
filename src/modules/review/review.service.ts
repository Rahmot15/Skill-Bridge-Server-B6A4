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

const getTutorReviews = async (tutorId: string) => {
  return prisma.review.findMany({
    where: { tutorId },
    include: {
      student: {
        select: {
          id: true,
          name: true,
          image: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews
};
