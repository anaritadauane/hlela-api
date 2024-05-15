/*
  Warnings:

  - You are about to drop the column `subcategoryId` on the `Business` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "Business" DROP CONSTRAINT "Business_subcategoryId_fkey";

-- AlterTable
ALTER TABLE "Business" DROP COLUMN "subcategoryId";

-- CreateTable
CREATE TABLE "_BusinessToSubcategory" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_BusinessToSubcategory_AB_unique" ON "_BusinessToSubcategory"("A", "B");

-- CreateIndex
CREATE INDEX "_BusinessToSubcategory_B_index" ON "_BusinessToSubcategory"("B");

-- AddForeignKey
ALTER TABLE "_BusinessToSubcategory" ADD CONSTRAINT "_BusinessToSubcategory_A_fkey" FOREIGN KEY ("A") REFERENCES "Business"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_BusinessToSubcategory" ADD CONSTRAINT "_BusinessToSubcategory_B_fkey" FOREIGN KEY ("B") REFERENCES "Subcategory"("id") ON DELETE CASCADE ON UPDATE CASCADE;
