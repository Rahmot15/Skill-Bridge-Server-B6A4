import { z } from "zod";

const updateUserStatusSchema = z.object({
  body: z.object({
    role: z.enum(["ADMIN", "STUDENT", "TUTOR"]).optional(),
    emailVerified: z.boolean().optional(),
  }).refine(
    (data) => Object.keys(data).length > 0,
    { message: "At least one field must be provided" }
  ),
  params: z.object({
    id: z.string().min(1, "User ID is required"),
  }),
});

export const adminValidationSchema = {
  updateUserStatusSchema,
};
