import { prisma } from "../../lib/prisma";

const createReview = async (payload: any, userId: string) => {
  // Use transaction: validate + create review + update tutor profile stats atomically
  return prisma.$transaction(async (tx) => {
    // 1. Validate booking exists and belongs to this student
    const booking = await tx.booking.findUnique({
      where: { id: payload.bookingId },
    });

    if (!booking) {
      throw new Error("Booking not found");
    }

    if (booking.studentId !== userId) {
      throw new Error("You can only review your own bookings");
    }

    if (booking.status !== "APPROVED") {
      throw new Error("You can only review approved bookings");
    }

    if (booking.tutorId !== payload.tutorId) {
      throw new Error("Tutor does not match this booking");
    }

    // 2. Create the review
    const review = await tx.review.create({
      data: {
        rating: payload.rating,
        comment: payload.comment,
        tutorId: payload.tutorId,
        bookingId: payload.bookingId,
        studentId: userId,
      },
    });

    // 3. Recalculate tutor stats from all reviews
    const stats = await tx.review.aggregate({
      where: { tutorId: payload.tutorId },
      _avg: { rating: true },
      _count: { id: true },
    });

    // 4. Count unique students who reviewed this tutor
    const uniqueStudents = await tx.review.groupBy({
      by: ["studentId"],
      where: { tutorId: payload.tutorId },
    });

    // 5. Update the tutor profile with recalculated stats
    await tx.tutorProfile.update({
      where: { userId: payload.tutorId },
      data: {
        rating: stats._avg.rating ?? 0,
        totalReviews: stats._count.id,
        totalStudents: uniqueStudents.length,
      },
    });

    return review;
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

// Utility: recalculate all tutor stats (for fixing existing data)
const recalculateTutorStats = async (tutorId: string) => {
  const stats = await prisma.review.aggregate({
    where: { tutorId },
    _avg: { rating: true },
    _count: { id: true },
  });

  const uniqueStudents = await prisma.review.groupBy({
    by: ["studentId"],
    where: { tutorId },
  });

  const approvedBookings = await prisma.booking.count({
    where: { tutorId, status: "APPROVED" },
  });

  await prisma.tutorProfile.update({
    where: { userId: tutorId },
    data: {
      rating: stats._avg.rating ?? 0,
      totalReviews: stats._count.id,
      totalStudents: uniqueStudents.length,
      completedSessions: approvedBookings,
    },
  });
};

export const ReviewService = {
  createReview,
  getTutorReviews,
  recalculateTutorStats,
};
