-- CreateTable
CREATE TABLE `RequestHelp` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `cityId` INTEGER NOT NULL,
    `townshipId` INTEGER NOT NULL,
    `location` VARCHAR(191) NOT NULL,
    `status` ENUM('pending', 'accepted', 'rejected') NOT NULL DEFAULT 'pending',
    `priority` ENUM('high', 'medium', 'low') NOT NULL DEFAULT 'low',
    `image` VARCHAR(191) NULL,
    `note` VARCHAR(191) NOT NULL,
    `admin_reply` LONGTEXT NOT NULL,
    `createdAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `updatedAt` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `RequestHelp_townshipId_cityId_priority_status_idx`(`townshipId`, `cityId`, `priority`, `status`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `RequestHelp` ADD CONSTRAINT `RequestHelp_cityId_fkey` FOREIGN KEY (`cityId`) REFERENCES `City`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `RequestHelp` ADD CONSTRAINT `RequestHelp_townshipId_fkey` FOREIGN KEY (`townshipId`) REFERENCES `Township`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
