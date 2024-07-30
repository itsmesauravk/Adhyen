/*
  Warnings:

  - Made the column `avatar` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `refreshToken` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "User" ADD COLUMN     "otp" INTEGER NOT NULL DEFAULT 0,
ALTER COLUMN "address" SET DEFAULT '',
ALTER COLUMN "avatar" SET NOT NULL,
ALTER COLUMN "avatar" SET DEFAULT 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
ALTER COLUMN "contact" SET DEFAULT '',
ALTER COLUMN "isPassBlockEnable" SET DEFAULT false,
ALTER COLUMN "lastFivePasswords" SET DEFAULT ARRAY[]::TEXT[],
ALTER COLUMN "refreshToken" SET NOT NULL,
ALTER COLUMN "refreshToken" SET DEFAULT '',
ALTER COLUMN "twoFAEnabled" SET DEFAULT false,
ALTER COLUMN "wrongPassCounter" SET DEFAULT 0;
