-- CreateTable
CREATE TABLE "public"."PreSignupTicket" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "codeHash" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "usedAt" TIMESTAMP(3),

    CONSTRAINT "PreSignupTicket_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PreSignupTicket_codeHash_key" ON "public"."PreSignupTicket"("codeHash");

-- CreateIndex
CREATE INDEX "PreSignupTicket_email_idx" ON "public"."PreSignupTicket"("email");

-- CreateIndex
CREATE INDEX "PreSignupTicket_expiresAt_idx" ON "public"."PreSignupTicket"("expiresAt");
