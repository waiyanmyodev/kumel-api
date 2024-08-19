/*
  Warnings:

  - Added the required column `imgPath` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` ADD COLUMN `imgPath` VARCHAR(191) NOT NULL;
