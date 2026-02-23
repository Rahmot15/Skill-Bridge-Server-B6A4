import { prisma } from "../../lib/prisma";

const getAllUsers = async () => {
  return prisma.user.findMany({
    select: {
      id: true,
      name: true,
      email: true,
      role: true,
      emailVerified: true,
      createdAt: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

const updateUserStatus = async (id: string, payload: any) => {
  return prisma.user.update({
    where: { id },
    data: payload,
  });
};

const getAllBookings = async () => {
  return prisma.booking.findMany({
    include: {
      student: true,
      tutor: true,
      category: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
};
