/*
  Warnings:

  - Added the required column `townshipId` to the `Team` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE `Team` ADD COLUMN `townshipId` INTEGER NOT NULL;

-- AddForeignKey
ALTER TABLE `Team` ADD CONSTRAINT `Team_townshipId_fkey` FOREIGN KEY (`townshipId`) REFERENCES `Township`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
