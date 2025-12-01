-- Tabela de usuários
CREATE TABLE `User` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `password` VARCHAR(128) NOT NULL,
    `last_login` DATETIME NULL,
    `is_superuser` TINYINT(1) NOT NULL DEFAULT 0,
    `username` VARCHAR(150) NOT NULL UNIQUE,
    `first_name` VARCHAR(150) NOT NULL,
    `last_name` VARCHAR(150) NOT NULL,
    `email` VARCHAR(254) NOT NULL,
    `is_staff` TINYINT(1) NOT NULL DEFAULT 0,
    `is_active` TINYINT(1) NOT NULL DEFAULT 1,
    `date_joined` DATETIME NOT NULL,
    UNIQUE KEY `username_unique` (`username`)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de categorias
CREATE TABLE `Category` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `categoryName` VARCHAR(120) NOT NULL UNIQUE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de produtos
CREATE TABLE `Product` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `name` VARCHAR(120) NOT NULL UNIQUE,
    `categoryProduct_id` INT NOT NULL,
    `height` DECIMAL(10,2) NOT NULL,
    `weight` DECIMAL(10,2) NOT NULL,
    `quantity` INT NOT NULL,
    `minimum_quantity` INT NOT NULL,
    `imageProduct` VARCHAR(100) NULL,
    FOREIGN KEY (`categoryProduct_id`) REFERENCES `Category`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;

-- Tabela de histórico
CREATE TABLE `Historic` (
    `id` INT AUTO_INCREMENT PRIMARY KEY,
    `responsibleUser_id` INT NOT NULL,
    `operation_date` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `typeOperation` ENUM('Input','Output') NOT NULL,
    `quantityProduct` INT NOT NULL,
    `product_id` INT NOT NULL,
    `created_at` DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (`responsibleUser_id`) REFERENCES `User`(`id`) ON DELETE CASCADE,
    FOREIGN KEY (`product_id`) REFERENCES `Product`(`id`) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;