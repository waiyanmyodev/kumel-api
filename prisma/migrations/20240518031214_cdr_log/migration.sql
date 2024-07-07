-- CreateTable
CREATE TABLE `cdr_log` (
    `cdr_log_id` INTEGER NOT NULL AUTO_INCREMENT,
    `pcode` CHAR(45) NOT NULL,
    `offer_code` CHAR(45) NOT NULL,
    `msisdn` CHAR(45) NOT NULL,
    `fees` CHAR(45) NOT NULL,
    `date_time` DATETIME(3) NULL DEFAULT CURRENT_TIMESTAMP(3),
    `status` CHAR(45) NOT NULL,
    `cdr_response_code` CHAR(45) NOT NULL,
    `s_id` CHAR(45) NOT NULL,

    PRIMARY KEY (`cdr_log_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;
