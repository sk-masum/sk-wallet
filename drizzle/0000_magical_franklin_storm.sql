CREATE TABLE `Account` (
	`id` text PRIMARY KEY NOT NULL,
	`userId` text NOT NULL,
	`type` text NOT NULL,
	`provider` text NOT NULL,
	`providerAccountId` text NOT NULL,
	`refresh_token` text,
	`access_token` text,
	`expires_at` integer,
	`token_type` text,
	`scope` text,
	`id_token` text,
	`session_state` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Account_provider_providerAccountId_key` ON `Account` (`provider`,`providerAccountId`);--> statement-breakpoint
CREATE INDEX `Account_userId_idx` ON `Account` (`userId`);--> statement-breakpoint
CREATE TABLE `Session` (
	`id` text PRIMARY KEY NOT NULL,
	`sessionToken` text NOT NULL,
	`userId` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `Session_sessionToken_unique` ON `Session` (`sessionToken`);--> statement-breakpoint
CREATE INDEX `Session_userId_idx` ON `Session` (`userId`);--> statement-breakpoint
CREATE TABLE `User` (
	`id` text PRIMARY KEY NOT NULL,
	`name` text,
	`email` text,
	`emailVerified` integer,
	`image` text,
	`password` text,
	`createdAt` integer DEFAULT CURRENT_TIMESTAMP,
	`updatedAt` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `User_email_unique` ON `User` (`email`);--> statement-breakpoint
CREATE TABLE `VerificationToken` (
	`identifier` text NOT NULL,
	`token` text NOT NULL,
	`expires` integer NOT NULL
);
--> statement-breakpoint
CREATE UNIQUE INDEX `VerificationToken_token_unique` ON `VerificationToken` (`token`);--> statement-breakpoint
CREATE UNIQUE INDEX `VerificationToken_identifier_token_key` ON `VerificationToken` (`identifier`,`token`);--> statement-breakpoint
CREATE TABLE `card` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`card_name` text,
	`number` text NOT NULL,
	`cvv` text NOT NULL,
	`holder_name` text,
	`network` integer NOT NULL,
	`isCredit` integer DEFAULT true,
	`expiry_month` integer DEFAULT 1,
	`expiry_year` integer DEFAULT 2025,
	`owner_id` text NOT NULL,
	`color_name` text,
	`tags` text DEFAULT '[]' NOT NULL,
	`status` text DEFAULT 'active' NOT NULL,
	`credit_limit` real,
	`provider_id` integer,
	`billing_date` integer,
	`payment_date` integer
);
--> statement-breakpoint
CREATE INDEX `card_provider_id_idx` ON `card` (`provider_id`);--> statement-breakpoint
CREATE INDEX `card_owner_id_idx` ON `card` (`owner_id`);--> statement-breakpoint
CREATE TABLE `card_provider` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`name` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE TABLE `credential_record` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`credential_type` text NOT NULL,
	`service_name` text NOT NULL,
	`identifier` text,
	`secret_token` text NOT NULL,
	`secret_hash` text NOT NULL,
	`secret_last4` text NOT NULL,
	`masked_secret` text NOT NULL,
	`url` text,
	`notes` text,
	`metadata` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `credential_record_user_id_credential_type_service_name_identifier_key` ON `credential_record` (`user_id`,`credential_type`,`service_name`,`identifier`);--> statement-breakpoint
CREATE INDEX `credential_record_credential_type_idx` ON `credential_record` (`credential_type`);--> statement-breakpoint
CREATE INDEX `credential_record_user_id_idx` ON `credential_record` (`user_id`);--> statement-breakpoint
CREATE INDEX `credential_record_updated_at_idx` ON `credential_record` (`updated_at`);--> statement-breakpoint
CREATE TABLE `dashboard_favorite` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`user_id` text NOT NULL,
	`feature_key` text NOT NULL,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE UNIQUE INDEX `dashboard_favorite_user_id_feature_key_key` ON `dashboard_favorite` (`user_id`,`feature_key`);--> statement-breakpoint
CREATE INDEX `dashboard_favorite_user_id_idx` ON `dashboard_favorite` (`user_id`);--> statement-breakpoint
CREATE INDEX `dashboard_favorite_updated_at_idx` ON `dashboard_favorite` (`updated_at`);--> statement-breakpoint
CREATE TABLE `document_access_audit` (
	`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL,
	`document_id` text,
	`actor_user_id` text,
	`action` text NOT NULL,
	`context` text,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `document_access_audit_actor_user_id_idx` ON `document_access_audit` (`actor_user_id`);--> statement-breakpoint
CREATE INDEX `document_access_audit_document_id_idx` ON `document_access_audit` (`document_id`);--> statement-breakpoint
CREATE TABLE `document_file` (
	`id` text PRIMARY KEY NOT NULL,
	`document_id` text NOT NULL,
	`file_path` text NOT NULL,
	`file_side` text DEFAULT 'front' NOT NULL,
	`mime_type` text,
	`size_bytes` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP
);
--> statement-breakpoint
CREATE INDEX `document_file_document_id_idx` ON `document_file` (`document_id`);--> statement-breakpoint
CREATE TABLE `document_record` (
	`id` text PRIMARY KEY NOT NULL,
	`user_id` text NOT NULL,
	`document_type` text NOT NULL,
	`document_number_token` text NOT NULL,
	`document_number_last4` text NOT NULL,
	`document_number_hash` text NOT NULL,
	`masked_number` text NOT NULL,
	`name_on_document` text,
	`metadata` text,
	`verified_at` integer,
	`expires_at` integer,
	`created_at` integer DEFAULT CURRENT_TIMESTAMP,
	`updated_at` integer DEFAULT CURRENT_TIMESTAMP,
	`category` text
);
--> statement-breakpoint
CREATE UNIQUE INDEX `document_record_document_type_document_number_hash_key` ON `document_record` (`document_type`,`document_number_hash`);--> statement-breakpoint
CREATE INDEX `document_record_category_idx` ON `document_record` (`category`);--> statement-breakpoint
CREATE INDEX `document_record_user_id_idx` ON `document_record` (`user_id`);--> statement-breakpoint
CREATE INDEX `document_record_updated_at_idx` ON `document_record` (`updated_at`);