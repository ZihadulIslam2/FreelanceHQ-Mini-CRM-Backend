-- CreateEnum
CREATE TYPE "ProjectStatus" AS ENUM ('not_started', 'in_progress', 'completed');

-- AlterTable
ALTER TABLE "Project" ADD COLUMN     "status" "ProjectStatus" NOT NULL DEFAULT 'not_started';
