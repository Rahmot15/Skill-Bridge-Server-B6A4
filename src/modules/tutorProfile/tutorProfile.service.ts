import { prisma } from "../../lib/prisma";

const getAllTutors = async () => {
  return prisma.tutorProfile.findMany({
    include: {
      user: {
        include: {
          skills: true,
        },
      },
    },
  });
};

const getSingleTutor = async (id: string) => {
  return prisma.tutorProfile.findUnique({
    where: { id },
    include: {
      user: {
        include: {
          skills: true,
        },
      },
    },
  });
};

export const TutorProfileService = {
  getAllTutors,
  getSingleTutor,
};
