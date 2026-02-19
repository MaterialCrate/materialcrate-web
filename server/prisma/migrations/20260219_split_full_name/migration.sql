-- Split User.fullName into User.firstName and User.surname.
ALTER TABLE "User"
ADD COLUMN "firstName" TEXT,
ADD COLUMN "surname" TEXT;

UPDATE "User"
SET
  "firstName" = NULLIF(split_part(trim(COALESCE("fullName", '')), ' ', 1), ''),
  "surname" = NULLIF(
    trim(regexp_replace(trim(COALESCE("fullName", '')), '^\S+\s*', '')),
    ''
  );

ALTER TABLE "User"
DROP COLUMN "fullName";
