/*
  Warnings:

  - Made the column `subcategoryId` on table `Business` required. This step will fail if there are existing NULL values in that column.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "Business" ALTER COLUMN "subcategoryId" SET NOT NULL;

-- AddForeignKey
ALTER TABLE "Business" ADD CONSTRAINT "Business_subcategoryId_fkey" FOREIGN KEY ("subcategoryId") REFERENCES "Subcategory"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
