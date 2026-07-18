import { z } from "zod";

const createReviewSchema = z.object({
  body: z.object({
    rating: z
      .number()
      .int("Rating must be an integer")
      .min(1, "Rating must be at least 1")
      .max(5, "Rating must be at most 5"),
    comment: z.string().max(1000, "Comment too long").optional(),
    tutorId: z.string().min(1, "Tutor ID is required"),
    bookingId: z.string().min(1, "Booking ID is required"),
  }),
});

export const reviewValidationSchema = {
  createReviewSchema,
};
