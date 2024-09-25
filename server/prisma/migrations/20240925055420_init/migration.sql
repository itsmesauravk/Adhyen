-- CreateTable
CREATE TABLE "Superuser" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT 'https://www.kindpng.com/picc/m/24-248253_user-profile-default-image-png-clipart-png-download.png',
    "contact" TEXT NOT NULL DEFAULT '',
    "lastFivePasswords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "twoFAEnabled" BOOLEAN NOT NULL DEFAULT false,
    "wrongPassCounter" INTEGER NOT NULL DEFAULT 0,
    "isPassBlockEnable" BOOLEAN NOT NULL DEFAULT false,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "otp" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Superuser_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Superuser_email_key" ON "Superuser"("email");
