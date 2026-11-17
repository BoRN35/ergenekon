CREATE TABLE `game_save_backups` (
	`user_id` text NOT NULL,
	`revision` integer NOT NULL,
	`snapshot` text NOT NULL,
	`updated_at` integer NOT NULL,
	PRIMARY KEY(`user_id`, `revision`)
);
--> statement-breakpoint
CREATE TABLE `game_saves` (
	`user_id` text PRIMARY KEY NOT NULL,
	`snapshot` text NOT NULL,
	`revision` integer NOT NULL,
	`updated_at` integer NOT NULL
);
