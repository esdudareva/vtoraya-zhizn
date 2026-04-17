CREATE TABLE `orders` (
	`id` int AUTO_INCREMENT NOT NULL,
	`orderNumber` varchar(32) NOT NULL,
	`customerName` varchar(255) NOT NULL,
	`customerEmail` varchar(320) NOT NULL,
	`customerPhone` varchar(50) NOT NULL,
	`deliveryMethod` varchar(64) NOT NULL,
	`deliveryAddress` text,
	`paymentMethod` varchar(64) NOT NULL,
	`items` json NOT NULL,
	`subtotal` decimal(10,2) NOT NULL,
	`deliveryCost` decimal(10,2) NOT NULL,
	`total` decimal(10,2) NOT NULL,
	`status` enum('new','processing','shipped','delivered','cancelled') NOT NULL DEFAULT 'new',
	`notes` text,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	`updatedAt` timestamp NOT NULL DEFAULT (now()) ON UPDATE CURRENT_TIMESTAMP,
	CONSTRAINT `orders_id` PRIMARY KEY(`id`),
	CONSTRAINT `orders_orderNumber_unique` UNIQUE(`orderNumber`)
);
--> statement-breakpoint
CREATE TABLE `reviews` (
	`id` int AUTO_INCREMENT NOT NULL,
	`name` varchar(255) NOT NULL,
	`rating` int NOT NULL,
	`text` text NOT NULL,
	`productName` varchar(255),
	`approved` enum('pending','approved','rejected') NOT NULL DEFAULT 'pending',
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `reviews_id` PRIMARY KEY(`id`)
);
