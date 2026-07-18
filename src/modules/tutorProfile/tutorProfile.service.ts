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

const getAllTutors = async (query?: Record<string, string | number | boolean>) => {
  const where: any = {};

  if (query?.search) {
    const q = String(query.search);
    where.OR = [
      { title: { contains: q, mode: "insensitive" } },
      { bio: { contains: q, mode: "insensitive" } },
      { user: { name: { contains: q, mode: "insensitive" } } },
      { languages: { has: q } },
    ];
  }

  if (query?.minRating) {
    where.rating = { gte: Number(query.minRating) };
  }

  if (query?.maxPrice) {
    where.hourlyRate = { lte: Number(query.maxPrice) };
  }

  if (query?.verified) {
    where.verified = true;
  }

  if (query?.language) {
    where.languages = { has: String(query.language) };
  }

  // Sort
  let orderBy: any = { rating: "desc" };
  const sort = String(query?.sort || "");
  if (sort === "price_asc") orderBy = { hourlyRate: "asc" };
  else if (sort === "price_desc") orderBy = { hourlyRate: "desc" };
  else if (sort === "students") orderBy = { totalStudents: "desc" };
  else if (sort === "sessions") orderBy = { completedSessions: "desc" };

  return prisma.tutorProfile.findMany({
    where,
    include: { user: true },
    orderBy,
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

const updateTutorProfile = async (userId: string, payload: any) => {
  return prisma.tutorProfile.update({
    where: { userId },
    data: payload,
  });
};

const updateAvailability = async (userId: string, availability: string, timeSlots?: any[]) => {
  const data: any = {};
  if (availability !== undefined) data.availability = availability;
  if (timeSlots !== undefined) data.availability = JSON.stringify(timeSlots);

  return prisma.tutorProfile.update({
    where: { userId },
    data,
  });
};

const getMyTutorProfile = async (userId: string) => {
  const result = await prisma.tutorProfile.findUnique({
    where: { userId },
    include: {
      user: true,
    },
  });

  if (!result) {
    throw new Error("Tutor profile not found");
  }

  return result;
};

export const TutorProfileService = {
  createTutorProfile,
  getAllTutors,
  getSingleTutor,
  updateTutorProfile,
  updateAvailability,
  getMyTutorProfile
};
