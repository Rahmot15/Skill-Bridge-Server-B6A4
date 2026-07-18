import { z } from "zod";

const createBookingSchema = z.object({
  body: z.object({
    tutorId: z.string().min(1, "Tutor ID is required"),
    categoryId: z.string().min(1, "Category ID is required"),
    date: z.string().min(1, "Date is required").datetime("Invalid date format"),
    message: z.string().max(1000, "Message too long").optional(),
  }),
});

const updateBookingStatusSchema = z.object({
  body: z.object({
    status: z.enum(["APPROVED", "REJECTED"], {
      message: "Status must be APPROVED or REJECTED",
    }),
  }),
  params: z.object({
    id: z.string().min(1, "Booking ID is required"),
  }),
});

export const bookingValidationSchema = {
  createBookingSchema,
  updateBookingStatusSchema,
};
