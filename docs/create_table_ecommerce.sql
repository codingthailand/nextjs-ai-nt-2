CREATE TABLE `categories` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255),
	PRIMARY KEY(`id`)
);

CREATE TABLE `products` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255),
	`description` TEXT,
	`price` DOUBLE,
	`category_id` INT,
	PRIMARY KEY(`id`)
);

CREATE TABLE `customers` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`name` VARCHAR(255),
	`address` VARCHAR(500),
	`phone` VARCHAR(20),
	PRIMARY KEY(`id`)
);

CREATE TABLE `orders` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`date` DATETIME,
	`customer_id` INT,
	`status` ENUM('delivered', 'received', 'processing'),
	`total_amount` DOUBLE,
	PRIMARY KEY(`id`)
);

CREATE TABLE `order_items` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`order_id` INT NOT NULL,
	`product_id` INT NOT NULL,
	`quantity` INT NOT NULL,
	`price` DOUBLE NOT NULL,
	PRIMARY KEY(`id`)
);

CREATE TABLE `product_images` (
	`id` INT NOT NULL AUTO_INCREMENT UNIQUE,
	`product_id` INT NOT NULL,
	`image_name` TEXT NOT NULL,
	`created_at` TIMESTAMP DEFAULT now(),
	PRIMARY KEY(`id`)
);

ALTER TABLE `products`
ADD FOREIGN KEY(`category_id`) REFERENCES `categories`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `orders`
ADD FOREIGN KEY(`customer_id`) REFERENCES `customers`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `order_items`
ADD FOREIGN KEY(`order_id`) REFERENCES `orders`(`id`)
ON UPDATE NO ACTION ON DELETE CASCADE;

ALTER TABLE `order_items`
ADD FOREIGN KEY(`product_id`) REFERENCES `products`(`id`)
ON UPDATE NO ACTION ON DELETE NO ACTION;

ALTER TABLE `product_images`
ADD FOREIGN KEY(`product_id`) REFERENCES `products`(`id`)
ON UPDATE NO ACTION ON DELETE CASCADE;