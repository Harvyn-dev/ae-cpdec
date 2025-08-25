/*
  Warnings:

  - You are about to drop the column `token` on the `EmailVerificationToken` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[tokenHash]` on the table `EmailVerificationToken` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `tokenHash` to the `EmailVerificationToken` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "public"."EmailVerificationToken_token_key";

-- DropIndex
DROP INDEX "public"."EmailVerificationToken_userId_key";

-- AlterTable
ALTER TABLE "public"."EmailVerificationToken" DROP COLUMN "token",
ADD COLUMN     "tokenHash" TEXT NOT NULL,
ADD COLUMN     "usedAt" TIMESTAMP(3);

-- CreateIndex
CREATE UNIQUE INDEX "EmailVerificationToken_tokenHash_key" ON "public"."EmailVerificationToken"("tokenHash");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_userId_idx" ON "public"."EmailVerificationToken"("userId");

-- CreateIndex
CREATE INDEX "EmailVerificationToken_expiresAt_idx" ON "public"."EmailVerificationToken"("expiresAt");
