import { prisma } from "../../lib/prisma";

// Only these fields can be updated by admin
const ALLOWED_FIELDS = ["role", "emailVerified"] as const;

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

const updateUserStatus = async (id: string, payload: Record<string, unknown>) => {
  // Field allowlisting: only allow specific fields to be updated
  const filteredData = Object.keys(payload)
    .filter((key) => ALLOWED_FIELDS.includes(key as typeof ALLOWED_FIELDS[number]))
    .reduce((obj, key) => ({ ...obj, [key]: payload[key] }), {} as Record<string, unknown>);

  return prisma.user.update({
    where: { id },
    data: filteredData,
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

const getDashboardStats = async () => {
  const [totalUsers, totalTutors, totalStudents, totalBookings, totalCategories, bookingsByStatus] =
    await Promise.all([
      prisma.user.count(),
      prisma.user.count({ where: { role: "TUTOR" } }),
      prisma.user.count({ where: { role: "STUDENT" } }),
      prisma.booking.count(),
      prisma.category.count(),
      prisma.booking.groupBy({
        by: ["status"],
        _count: { id: true },
      }),
    ]);

  const pendingBookings = bookingsByStatus.find((b) => b.status === "PENDING")?._count.id ?? 0;
  const approvedBookings = bookingsByStatus.find((b) => b.status === "APPROVED")?._count.id ?? 0;
  const rejectedBookings = bookingsByStatus.find((b) => b.status === "REJECTED")?._count.id ?? 0;
  const cancelledBookings = bookingsByStatus.find((b) => b.status === "CANCELLED")?._count.id ?? 0;

  return {
    totalUsers,
    totalTutors,
    totalStudents,
    totalBookings,
    totalCategories,
    pendingBookings,
    approvedBookings,
    rejectedBookings,
    cancelledBookings,
  };
};

export const AdminService = {
  getAllUsers,
  updateUserStatus,
  getAllBookings,
  getDashboardStats,
};
