import { prisma } from "../lib/prisma";
import { UserRole } from "../middlewares/auth";

async function seedAdmin() {
  try {
    console.log("Seeding Admin...");

    const existingAdmin = await prisma.user.findUnique({
      where: { email: process.env.ADMIN_EMAIL! },
    });

    if (existingAdmin) {
      console.log("Admin already exists");
      return;
    }

    await prisma.user.create({
      data: {
        id: crypto.randomUUID(),
        name: process.env.ADMIN_NAME!,
        email: process.env.ADMIN_EMAIL!,
        role: UserRole.ADMIN,
        emailVerified: true,
      },
    });

    console.log("Admin seeded successfully");
  } catch (error) {
    console.error("Seed failed:", error);
  } finally {
    await prisma.$disconnect();
  }
}

seedAdmin();
