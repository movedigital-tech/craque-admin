-- AlterTable: replace weekday (Int?) with weekdays (Int[])
ALTER TABLE "ClassGroup" DROP COLUMN IF EXISTS "weekday";
ALTER TABLE "ClassGroup" ADD COLUMN "weekdays" INTEGER[] NOT NULL DEFAULT '{}';
