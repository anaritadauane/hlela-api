/*
  Warnings:

  - You are about to drop the `Subcategory` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `_BusinessToSubcategory` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Subcategory" DROP CONSTRAINT "Subcategory_categoryId_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToSubcategory" DROP CONSTRAINT "_BusinessToSubcategory_A_fkey";

-- DropForeignKey
ALTER TABLE "_BusinessToSubcategory" DROP CONSTRAINT "_BusinessToSubcategory_B_fkey";

-- DropTable
DROP TABLE "Subcategory";

-- DropTable
DROP TABLE "_BusinessToSubcategory";
