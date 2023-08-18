-- CreateTable
CREATE TABLE "categories" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "isactive" BOOLEAN NOT NULL DEFAULT true,
    "createby" INTEGER NOT NULL,
    "createat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "products" (
    "id" SERIAL NOT NULL,
    "categoryid" INTEGER NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "lastactivityon" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isactive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "products_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "products" ADD CONSTRAINT "products_categoryid_fkey" FOREIGN KEY ("categoryid") REFERENCES "categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
