/*
  Warnings:

  - You are about to drop the column `skillId` on the `Booking` table. All the data in the column will be lost.
  - You are about to drop the column `tutorId` on the `Category` table. All the data in the column will be lost.
  - Added the required column `categoryId` to the `Booking` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Booking" DROP CONSTRAINT "Booking_skillId_fkey";

-- DropForeignKey
ALTER TABLE "Category" DROP CONSTRAINT "Category_tutorId_fkey";

-- AlterTable
ALTER TABLE "Booking" DROP COLUMN "skillId",
ADD COLUMN     "categoryId" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Category" DROP COLUMN "tutorId";

-- AddForeignKey
ALTER TABLE "Booking" ADD CONSTRAINT "Booking_categoryId_fkey" FOREIGN KEY ("categoryId") REFERENCES "Category"("id") ON DELETE CASCADE ON UPDATE CASCADE;
