ALTER TABLE "User"
ADD COLUMN IF NOT EXISTS "deleted" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "deletedAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "disabled" BOOLEAN NOT NULL DEFAULT false,
ADD COLUMN IF NOT EXISTS "disabledAt" TIMESTAMP(3),
ADD COLUMN IF NOT EXISTS "disabledUntil" TIMESTAMP(3);

DROP INDEX IF EXISTS "User_username_key";
DROP INDEX IF EXISTS "User_email_key";

CREATE UNIQUE INDEX IF NOT EXISTS "User_username_active_key"
ON "User" ("username")
WHERE "deleted" = false AND "disabled" = false;

CREATE UNIQUE INDEX IF NOT EXISTS "User_email_active_key"
ON "User" ("email")
WHERE "deleted" = false AND "disabled" = false;
