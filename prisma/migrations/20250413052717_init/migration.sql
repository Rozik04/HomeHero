-- CreateEnum
CREATE TYPE "UserRole" AS ENUM ('admin', 'superadmin', 'vieweradmin', 'legaluser', 'individualuser');

-- CreateEnum
CREATE TYPE "UserStatus" AS ENUM ('active', 'passive');

-- CreateEnum
CREATE TYPE "PaymentType" AS ENUM ('cash', 'card');

-- CreateEnum
CREATE TYPE "OrderStatus" AS ENUM ('pending', 'accepted', 'rejected', 'canceled', 'delivered');

-- CreateTable
CREATE TABLE "User" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "role" "UserRole" NOT NULL,
    "status" "UserStatus" NOT NULL,
    "regionID" TEXT,
    "location" TEXT NOT NULL,
    "passportSeries" TEXT,
    "inn" TEXT,

    CONSTRAINT "User_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Region" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Region_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "levelID" TEXT NOT NULL,
    "priceHourly" INTEGER NOT NULL,
    "priceDaily" INTEGER NOT NULL,
    "tools" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "userID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "toolID" TEXT NOT NULL,
    "levelID" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "toolCount" INTEGER NOT NULL,
    "measure" TEXT NOT NULL,
    "totalPrice" INTEGER NOT NULL,
    "locationLat" TEXT NOT NULL,
    "locationLong" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "withDelivery" BOOLEAN NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "commentToDelivery" TEXT NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionRu" TEXT NOT NULL,
    "descriptionUz" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "price" INTEGER NOT NULL,
    "quantity" INTEGER NOT NULL,
    "code" TEXT NOT NULL,
    "brandID" TEXT NOT NULL,
    "capacityID" TEXT NOT NULL,
    "sizeID" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "levelID" TEXT NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Brand" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Brand_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Capacity" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Capacity_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Size" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Size_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Level" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,

    CONSTRAINT "Level_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "masterID" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "year" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "passportImage" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "masterJobsID" TEXT NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterJobs" (
    "id" TEXT NOT NULL,
    "toolID" TEXT NOT NULL,
    "minWorkingHour" INTEGER NOT NULL,
    "levelID" TEXT NOT NULL,
    "priceHourly" INTEGER NOT NULL,
    "priceDaily" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,

    CONSTRAINT "MasterJobs_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "GeneralInfo" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "location" TEXT NOT NULL,
    "phone" TEXT NOT NULL,

    CONSTRAINT "GeneralInfo_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ShowCase" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionRu" TEXT NOT NULL,
    "descriptionUz" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,

    CONSTRAINT "ShowCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "question" TEXT NOT NULL,
    "answer" TEXT NOT NULL,

    CONSTRAINT "FAQ_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Contact" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "phone" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "email" TEXT NOT NULL,

    CONSTRAINT "Contact_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Partner" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_brandID_fkey" FOREIGN KEY ("brandID") REFERENCES "Brand"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_capacityID_fkey" FOREIGN KEY ("capacityID") REFERENCES "Capacity"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Master" ADD CONSTRAINT "Master_masterJobsID_fkey" FOREIGN KEY ("masterJobsID") REFERENCES "MasterJobs"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
