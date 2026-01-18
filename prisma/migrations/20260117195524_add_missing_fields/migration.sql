-- AlterTable
ALTER TABLE "buildings" ADD COLUMN     "is_active_for_registration" BOOLEAN NOT NULL DEFAULT true;

-- AlterTable
ALTER TABLE "users" ADD COLUMN     "is_profile_public" BOOLEAN NOT NULL DEFAULT true;
