-- CreateTable
CREATE TABLE "public"."Officer" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "role" TEXT NOT NULL,

    CONSTRAINT "Officer_pkey" PRIMARY KEY ("id")
);
