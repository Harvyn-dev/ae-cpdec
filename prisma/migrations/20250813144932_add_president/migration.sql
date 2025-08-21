-- CreateTable
CREATE TABLE "public"."President" (
    "id" TEXT NOT NULL,
    "fullName" TEXT NOT NULL,
    "yearFrom" INTEGER NOT NULL,
    "yearTo" INTEGER NOT NULL,

    CONSTRAINT "President_pkey" PRIMARY KEY ("id")
);
