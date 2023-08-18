-- AlterTable
ALTER TABLE "users" ADD COLUMN     "countrycode" TEXT,
ADD COLUMN     "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "isactive" BOOLEAN NOT NULL DEFAULT true,
ADD COLUMN     "lastactiveon" TIMESTAMP(3),
ADD COLUMN     "modifiedat" TIMESTAMP(3);

-- CreateTable
CREATE TABLE "roles" (
    "id" SERIAL NOT NULL,
    "title" TEXT NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "isactive" BOOLEAN NOT NULL DEFAULT true,

    CONSTRAINT "roles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "userroles" (
    "id" SERIAL NOT NULL,
    "userid" INTEGER NOT NULL,
    "roleid" INTEGER NOT NULL,
    "createdat" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "modifiedat" TIMESTAMP(3),

    CONSTRAINT "userroles_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "userroles" ADD CONSTRAINT "userroles_userid_fkey" FOREIGN KEY ("userid") REFERENCES "users"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "userroles" ADD CONSTRAINT "userroles_roleid_fkey" FOREIGN KEY ("roleid") REFERENCES "roles"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
