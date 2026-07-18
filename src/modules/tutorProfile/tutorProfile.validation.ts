import { z } from "zod";

const createTutorProfileSchema = z.object({
  body: z.object({
    title: z.string().max(200, "Title too long").optional(),
    bio: z.string().max(2000, "Bio too long").optional(),
    education: z.string().max(500, "Education too long").optional(),
    experienceYears: z
      .number()
      .int()
      .min(0, "Experience cannot be negative")
      .max(50, "Experience too high")
      .optional(),
    hourlyRate: z
      .number()
      .int()
      .min(1, "Hourly rate must be at least 1")
      .max(10000, "Hourly rate too high")
      .optional(),
    availability: z.string().max(500, "Availability too long").optional(),
    languages: z.array(z.string().max(50)).max(10, "Too many languages").optional(),
  }),
});

const updateTutorProfileSchema = z.object({
  body: z.object({
    title: z.string().max(200, "Title too long").optional(),
    bio: z.string().max(2000, "Bio too long").optional(),
    education: z.string().max(500, "Education too long").optional(),
    experienceYears: z
      .number()
      .int()
      .min(0, "Experience cannot be negative")
      .max(50, "Experience too high")
      .optional(),
    hourlyRate: z
      .number()
      .int()
      .min(1, "Hourly rate must be at least 1")
      .max(10000, "Hourly rate too high")
      .optional(),
    languages: z.array(z.string().max(50)).max(10, "Too many languages").optional(),
  }),
});

const updateAvailabilitySchema = z.object({
  body: z.object({
    availability: z.string().max(500, "Availability too long"),
  }),
});

export const tutorProfileValidationSchema = {
  createTutorProfileSchema,
  updateTutorProfileSchema,
  updateAvailabilitySchema,
};
