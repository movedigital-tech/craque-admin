-- AlterTable
ALTER TABLE "User" ADD COLUMN "addressLine" TEXT;
ALTER TABLE "User" ADD COLUMN "addressCity" TEXT;
ALTER TABLE "User" ADD COLUMN "addressState" TEXT;
ALTER TABLE "User" ADD COLUMN "addressZip" TEXT;

-- AlterTable
ALTER TABLE "Membership" ADD COLUMN "internalNote" TEXT;
