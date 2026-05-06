CREATE TABLE `campaign_analytics` (
	`id` int AUTO_INCREMENT NOT NULL,
	`campaignId` int NOT NULL,
	`subscriberId` int NOT NULL,
	`email` varchar(320) NOT NULL,
	`opened` tinyint NOT NULL DEFAULT 0,
	`openedAt` timestamp,
	`clicked` tinyint NOT NULL DEFAULT 0,
	`clickedAt` timestamp,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `campaign_analytics_id` PRIMARY KEY(`id`)
);
--> statement-breakpoint
CREATE TABLE `subscriber_segments` (
	`id` int AUTO_INCREMENT NOT NULL,
	`subscriberId` int NOT NULL,
	`segment` varchar(100) NOT NULL,
	`createdAt` timestamp NOT NULL DEFAULT (now()),
	CONSTRAINT `subscriber_segments_id` PRIMARY KEY(`id`)
);
