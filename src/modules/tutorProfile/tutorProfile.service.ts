import { prisma } from "../../lib/prisma";

const createTutorProfile = async (
  userId: string,
  payload: {
    title?: string;
    bio?: string;
    education?: string;
    experienceYears?: number;
    hourlyRate?: number;
    availability?: string;
    languages?: string[];
  },
) => {
  // check already exists
  const existing = await prisma.tutorProfile.findUnique({
    where: { userId },
  });

  if (existing) {
    throw new Error("Tutor profile already exists");
  }

  const result = await prisma.tutorProfile.create({
    data: {
      userId,
      ...payload,
    },
  });

  return result;
};

const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: {
      user: true,
    },
  });
};

const getSingleTutor = async (id: string) => {
  return prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: true,
    },
  });
};

export const TutorProfileService = {
  createTutorProfile,
  getAllTutors,
  getSingleTutor,
};
