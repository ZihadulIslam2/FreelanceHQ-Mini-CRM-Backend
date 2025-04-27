/*
  Warnings:

  - Added the required column `interactionType` to the `InteractionLog` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "InteractionType" AS ENUM ('call', 'meeting', 'email');

-- AlterTable
ALTER TABLE "InteractionLog" ADD COLUMN     "interactionType" "InteractionType" NOT NULL;
