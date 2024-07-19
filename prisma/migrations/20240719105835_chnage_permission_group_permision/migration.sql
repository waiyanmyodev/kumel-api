/*
  Warnings:

  - You are about to drop the `PermissionPermissionGroup` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE `PermissionPermissionGroup` DROP FOREIGN KEY `PermissionPermissionGroup_groupId_fkey`;

-- DropForeignKey
ALTER TABLE `PermissionPermissionGroup` DROP FOREIGN KEY `PermissionPermissionGroup_permissionId_fkey`;

-- DropTable
DROP TABLE `PermissionPermissionGroup`;

-- CreateTable
CREATE TABLE `PermissionGroupPermission` (
    `permissionId` INTEGER NOT NULL,
    `groupId` INTEGER NOT NULL,

    PRIMARY KEY (`permissionId`, `groupId`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `PermissionGroupPermission` ADD CONSTRAINT `PermissionGroupPermission_permissionId_fkey` FOREIGN KEY (`permissionId`) REFERENCES `Permission`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `PermissionGroupPermission` ADD CONSTRAINT `PermissionGroupPermission_groupId_fkey` FOREIGN KEY (`groupId`) REFERENCES `PermissionGroup`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;
