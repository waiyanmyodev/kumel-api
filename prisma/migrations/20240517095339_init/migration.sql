-- CreateTable
CREATE TABLE `sms_log` (
    `sms_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pcode` VARCHAR(191) NULL,
    `msisdn` INTEGER NULL,
    `date_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `sms_code` INTEGER NOT NULL,
    `sent_status` VARCHAR(191) NULL,

    PRIMARY KEY (`sms_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
