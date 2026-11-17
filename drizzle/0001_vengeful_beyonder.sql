CREATE TABLE `world_players` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`public_id` text NOT NULL,
	`name` text NOT NULL,
	`level` integer NOT NULL,
	`oba_level` integer NOT NULL,
	`wall_level` integer NOT NULL,
	`updated_at` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `world_players_user_id_unique` ON `world_players` (`user_id`);--> statement-breakpoint
CREATE UNIQUE INDEX `world_players_public_id_unique` ON `world_players` (`public_id`);