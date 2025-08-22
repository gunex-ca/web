CREATE TYPE "public"."user_status" AS ENUM('active', 'suspended', 'deleted');--> statement-breakpoint
CREATE TYPE "public"."external_link_status" AS ENUM('linked', 'imported', 'synced', 'failed', 'unpublished');--> statement-breakpoint
CREATE TYPE "public"."listing_image_status" AS ENUM('pending', 'uploaded', 'rejected');--> statement-breakpoint
CREATE TYPE "public"."listing_status" AS ENUM('draft', 'active', 'sold', 'archived', 'removed');--> statement-breakpoint
CREATE TYPE "public"."offer_status" AS ENUM('pending', 'accepted', 'declined', 'withdrawn', 'expired');--> statement-breakpoint
CREATE TABLE "account" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"account_id" text NOT NULL,
	"provider_id" text NOT NULL,
	"user_id" uuid NOT NULL,
	"access_token" text,
	"refresh_token" text,
	"id_token" text,
	"access_token_expires_at" timestamp,
	"refresh_token_expires_at" timestamp,
	"scope" text,
	"password" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "session" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"expires_at" timestamp NOT NULL,
	"token" text NOT NULL,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"ip_address" text,
	"user_agent" text,
	"user_id" uuid NOT NULL,
	CONSTRAINT "session_token_unique" UNIQUE("token")
);
--> statement-breakpoint
CREATE TABLE "user" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"email" text NOT NULL,
	"email_verified" boolean NOT NULL,
	"image" text,
	"created_at" timestamp with time zone NOT NULL,
	"updated_at" timestamp with time zone NOT NULL,
	"phone_number" text,
	"phone_number_verified" boolean,
	"username" text,
	"display_username" text,
	"postal_code" text,
	CONSTRAINT "user_email_unique" UNIQUE("email"),
	CONSTRAINT "user_phone_number_unique" UNIQUE("phone_number"),
	CONSTRAINT "user_username_unique" UNIQUE("username")
);
--> statement-breakpoint
CREATE TABLE "verification" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"identifier" text NOT NULL,
	"value" text NOT NULL,
	"expires_at" timestamp NOT NULL,
	"created_at" timestamp,
	"updated_at" timestamp
);
--> statement-breakpoint
CREATE TABLE "favorite" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"user_id" uuid NOT NULL,
	"listing_id" uuid NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"public_id" varchar(12) NOT NULL,
	"seller_id" uuid,
	"sub_category_id" text NOT NULL,
	"title" varchar(255) NOT NULL,
	"description" text,
	"price" numeric(10, 2) NOT NULL,
	"properties" jsonb,
	"status" "listing_status" DEFAULT 'draft' NOT NULL,
	"display_ordering" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "listing_public_id_unique" UNIQUE("public_id")
);
--> statement-breakpoint
CREATE TABLE "listing_external" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"platform" varchar(64) NOT NULL,
	"external_id" varchar(128),
	"postal_code" text,
	"url" varchar(2048),
	"meta" jsonb,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"last_synced_at" timestamp with time zone,
	"seller_username" varchar(128),
	"seller_rating" numeric,
	"seller_reviews" integer
);
--> statement-breakpoint
CREATE TABLE "listing_image" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"object_key" varchar(255) NOT NULL,
	"name" text,
	"alt" varchar(255),
	"sort_order" integer DEFAULT 0 NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"status" "listing_image_status" NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing_report" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reporter_id" uuid NOT NULL,
	"listing_id" uuid,
	"message_id" uuid,
	"reason" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "listing_view" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"viewer_id" uuid,
	"ip_hash" varchar(64),
	"user_agent" varchar(256),
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "message" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"listing_id" uuid NOT NULL,
	"sender_id" uuid NOT NULL,
	"receiver_id" uuid NOT NULL,
	"content" text NOT NULL,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"read_at" timestamp with time zone
);
--> statement-breakpoint
CREATE TABLE "review" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"reviewer_id" uuid NOT NULL,
	"reviewee_id" uuid NOT NULL,
	"rating" integer NOT NULL,
	"title" varchar(120),
	"content" text,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL,
	"updated_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
CREATE TABLE "form_submission" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"endpoint" varchar(64) NOT NULL,
	"type" varchar(64),
	"data" jsonb NOT NULL,
	"ip" varchar(64),
	"user_agent" varchar(256),
	"referer" text,
	"user_id" uuid,
	"created_at" timestamp with time zone DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "account" ADD CONSTRAINT "account_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "session" ADD CONSTRAINT "session_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "favorite" ADD CONSTRAINT "favorite_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing" ADD CONSTRAINT "listing_seller_id_user_id_fk" FOREIGN KEY ("seller_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_external" ADD CONSTRAINT "listing_external_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_image" ADD CONSTRAINT "listing_image_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_report" ADD CONSTRAINT "listing_report_reporter_id_user_id_fk" FOREIGN KEY ("reporter_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_report" ADD CONSTRAINT "listing_report_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_report" ADD CONSTRAINT "listing_report_message_id_message_id_fk" FOREIGN KEY ("message_id") REFERENCES "public"."message"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_view" ADD CONSTRAINT "listing_view_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "listing_view" ADD CONSTRAINT "listing_view_viewer_id_user_id_fk" FOREIGN KEY ("viewer_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_listing_id_listing_id_fk" FOREIGN KEY ("listing_id") REFERENCES "public"."listing"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_sender_id_user_id_fk" FOREIGN KEY ("sender_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "message" ADD CONSTRAINT "message_receiver_id_user_id_fk" FOREIGN KEY ("receiver_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_reviewer_id_user_id_fk" FOREIGN KEY ("reviewer_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "review" ADD CONSTRAINT "review_reviewee_id_user_id_fk" FOREIGN KEY ("reviewee_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "form_submission" ADD CONSTRAINT "form_submission_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;--> statement-breakpoint
CREATE UNIQUE INDEX "favorites_user_listing_uk" ON "favorite" USING btree ("user_id","listing_id");--> statement-breakpoint
CREATE INDEX "listings_seller_id_idx" ON "listing" USING btree ("seller_id");--> statement-breakpoint
CREATE INDEX "listings_category_idx" ON "listing" USING btree ("sub_category_id");--> statement-breakpoint
CREATE INDEX "listings_status_idx" ON "listing" USING btree ("status");--> statement-breakpoint
CREATE INDEX "listings_price_idx" ON "listing" USING btree ("price");--> statement-breakpoint
CREATE INDEX "listings_display_ordering_idx" ON "listing" USING btree ("display_ordering");--> statement-breakpoint
CREATE INDEX "listings_status_created_at_idx" ON "listing" USING btree ("status","created_at");--> statement-breakpoint
CREATE INDEX "listings_category_status_created_at_idx" ON "listing" USING btree ("sub_category_id","status","created_at");--> statement-breakpoint
CREATE UNIQUE INDEX "listings_public_id_uk" ON "listing" USING btree ("public_id");--> statement-breakpoint
CREATE INDEX "listing_external_listing_id_idx" ON "listing_external" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "listing_external_platform_idx" ON "listing_external" USING btree ("platform");--> statement-breakpoint
CREATE UNIQUE INDEX "listing_external_platform_external_id_uk" ON "listing_external" USING btree ("platform","external_id");--> statement-breakpoint
CREATE INDEX "listing_images_listing_id_idx" ON "listing_image" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "reports_reporter_id_idx" ON "listing_report" USING btree ("reporter_id");--> statement-breakpoint
CREATE INDEX "listing_view_listing_id_idx" ON "listing_view" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "listing_view_viewer_id_idx" ON "listing_view" USING btree ("viewer_id");--> statement-breakpoint
CREATE INDEX "messages_listing_id_idx" ON "message" USING btree ("listing_id");--> statement-breakpoint
CREATE INDEX "messages_sender_id_idx" ON "message" USING btree ("sender_id");--> statement-breakpoint
CREATE INDEX "messages_receiver_id_idx" ON "message" USING btree ("receiver_id");--> statement-breakpoint
CREATE INDEX "review_reviewer_id_idx" ON "review" USING btree ("reviewer_id");--> statement-breakpoint
CREATE INDEX "review_reviewee_id_idx" ON "review" USING btree ("reviewee_id");--> statement-breakpoint
CREATE UNIQUE INDEX "review_reviewer_reviewee_uk" ON "review" USING btree ("reviewer_id","reviewee_id");--> statement-breakpoint
CREATE INDEX "form_submission_user_id_idx" ON "form_submission" USING btree ("user_id");