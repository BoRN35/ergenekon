CREATE TABLE `game_save_recovery` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`snapshot` text NOT NULL,
	`created_at` integer NOT NULL
);
