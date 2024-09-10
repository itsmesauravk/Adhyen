-- CreateTable
CREATE TABLE "Provider" (
    "id" SERIAL NOT NULL,
    "name" TEXT NOT NULL,
    "password" TEXT NOT NULL DEFAULT '',
    "email" TEXT NOT NULL,
    "avatar" TEXT NOT NULL DEFAULT '',
    "contact" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "providerType" TEXT NOT NULL,
    "documentImage" TEXT NOT NULL DEFAULT '',
    "verified" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "lastFivePasswords" TEXT[] DEFAULT ARRAY[]::TEXT[],
    "twoFAEnabled" BOOLEAN NOT NULL DEFAULT false,
    "wrongPassCounter" INTEGER NOT NULL DEFAULT 0,
    "isPassBlockEnable" BOOLEAN NOT NULL DEFAULT false,
    "isFirstLogin" BOOLEAN NOT NULL DEFAULT true,
    "refreshToken" TEXT NOT NULL DEFAULT '',
    "otp" INTEGER NOT NULL DEFAULT 0,

    CONSTRAINT "Provider_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Provider_email_key" ON "Provider"("email");
