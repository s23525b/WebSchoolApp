CREATE SCHEMA IF NOT EXISTS `tin-example`;

CREATE TABLE IF NOT EXISTS `tin-example`.`Professor`
(
    `_id`            INT UNSIGNED NOT NULL AUTO_INCREMENT,
    `firstName`      VARCHAR(50)  NOT NULL,
    `lastName`       VARCHAR(50)  NOT NULL,
    `email`          VARCHAR(50)  NOT NULL,
    `specialization` VARCHAR(50),
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `prof_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB
  CHARSET = utf8
  COLLATE = utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tin-example`.`Department`
(
    `_id`         INT         NOT NULL,
    `name`        VARCHAR(30) NOT NULL,
    `totalHours`  INT         NOT NULL,
    `description` VARCHAR(50) NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `dept_id_UNIQUE` (`_id` ASC)
) ENGINE = InnoDB
  CHARSET = utf8
  COLLATE = utf8_general_ci;


CREATE TABLE IF NOT EXISTS `tin-example`.`Lecture`
(
    `_id`      INT          NOT NULL,
    `prof_id`  INT UNSIGNED NOT NULL,
    `dept_id`  INT UNSIGNED NOT NULL,
    `name`     VARCHAR(50)  NOT NULL,
    `dateFrom` DATETIME     NOT NULL,
    `dateTo`   DATETIME     NULL,
    `hours`    INT          NOT NULL,
    PRIMARY KEY (`_id`),
    UNIQUE INDEX `lect_id_UNIQUE` (`_id` ASC),
    CONSTRAINT `prof_fk` FOREIGN KEY (`prof_id`) REFERENCES `tin-example`.`Professor` (`_id`),
    CONSTRAINT `dept_fk` FOREIGN KEY (`dept_id`) REFERENCES `tin-example`.`Department` (`_id`)
) ENGINE = InnoDB
  CHARSET = utf8
  COLLATE = utf8_general_ci;

INSERT IGNORE INTO `tin-example`.`Professor` (`_id`, `firstName`, `lastName`, `email`, `specialization`)
VALUES (1, 'Jan', 'Kowalski', 'jan.kowalski@utoronto.com', 'Matematyka'),
       (2, 'Miroslaw', 'Ogorek', 'miroslaw.ogorek@utoronto.com', 'Informatyka Matematyka');

INSERT IGNORE INTO `tin-example`.`Department` (`_id`, `name`, `totalHours`, `description`)
VALUES (1, 'Matematyka', 240, 'Matematyka to krolowa nauk'),
       (2, 'Informatyka', 300, NULL);

INSERT IGNORE INTO `tin-example`.`Lecture` (`_id`, `prof_id`, `dept_id`, `name`, `dateFrom`, `dateTo`, `hours`)
VALUES (1, 1, 1, 'Analiza Matematyczna', '2022-11-14 12:40:00', '2022-11-14 14:00:00', 2),
       (2, 2, 2, 'Technika Komputerow', '2022-11-16 13:40:00', '2022-11-16 17:00:00', 3),
       (3, 1, 2, 'Algorytmika', '2022-11-15 14:40:00', NULL, 4);


