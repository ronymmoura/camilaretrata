/*
  Warnings:

  - Made the column `icon` on table `Category` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "MediaType" AS ENUM ('IMAGE', 'VIDEO');

-- AlterTable
ALTER TABLE "Category" ALTER COLUMN "icon" SET NOT NULL;

-- AlterTable
ALTER TABLE "Photo" ADD COLUMN     "type" "MediaType" NOT NULL DEFAULT 'IMAGE';
