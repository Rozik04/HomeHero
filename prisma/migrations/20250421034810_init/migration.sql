-- CreateEnum
CREATE TYPE "ShowCaseType" AS ENUM ('slider', 'banner', 'card');

-- CreateEnum
CREATE TYPE "TimeUnit" AS ENUM ('day', 'hour');

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
CREATE TABLE "Order" (
    "id" TEXT NOT NULL,
    "locationLat" TEXT NOT NULL,
    "locationLong" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "orderDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "deliveryDate" TIMESTAMP(3) NOT NULL,
    "paymentType" "PaymentType" NOT NULL,
    "withDelivery" BOOLEAN NOT NULL,
    "status" "OrderStatus" NOT NULL,
    "commentToDelivery" TEXT,
    "userID" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Order_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Basket" (
    "id" TEXT NOT NULL,
    "userID" TEXT,
    "productID" TEXT,
    "toolID" TEXT,
    "levelID" TEXT,
    "timeUnit" "TimeUnit",
    "countOfTool" INTEGER,
    "countOfProduct" INTEGER,
    "workingHours" INTEGER NOT NULL,
    "measure" INTEGER,
    "hourlyPrice" INTEGER,
    "dailyPrice" INTEGER,
    "totalPrice" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Basket_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OrderItem" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "productID" TEXT,
    "toolID" TEXT,
    "levelID" TEXT,
    "timeUnit" "TimeUnit",
    "countOfTool" INTEGER,
    "countOfProduct" INTEGER,
    "workingHours" INTEGER NOT NULL,
    "measure" INTEGER,
    "totalPrice" INTEGER,
    "price" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "OrderItem_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Comment" (
    "id" TEXT NOT NULL,
    "message" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "userID" TEXT,

    CONSTRAINT "Comment_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "CommentRating" (
    "id" TEXT NOT NULL,
    "star" INTEGER NOT NULL,
    "masterID" TEXT NOT NULL,
    "commentID" TEXT NOT NULL,

    CONSTRAINT "CommentRating_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "OderMaster" (
    "id" TEXT NOT NULL,
    "orderID" TEXT NOT NULL,
    "masterID" TEXT NOT NULL,

    CONSTRAINT "OderMaster_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Master" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "phone" TEXT NOT NULL,
    "dob" TEXT NOT NULL,
    "image" TEXT NOT NULL,
    "passportImage" TEXT NOT NULL,
    "rating" DECIMAL(65,30),
    "about" TEXT NOT NULL,

    CONSTRAINT "Master_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "MasterJobs" (
    "id" TEXT NOT NULL,
    "toolID" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "workingHours" INTEGER NOT NULL,
    "levelID" TEXT NOT NULL,
    "priceHourly" INTEGER NOT NULL,
    "priceDaily" INTEGER NOT NULL,
    "experience" TEXT NOT NULL,
    "masterID" TEXT NOT NULL,

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
    "type" "ShowCaseType" NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "startDate" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "endDate" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "ShowCase_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "FAQ" (
    "id" TEXT NOT NULL,
    "questionUz" TEXT NOT NULL,
    "questionRu" TEXT NOT NULL,
    "questionEn" TEXT NOT NULL,
    "answerUz" TEXT NOT NULL,
    "answerRu" TEXT NOT NULL,
    "answerEn" TEXT NOT NULL,

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
    "phone" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "address" TEXT NOT NULL,
    "status" BOOLEAN NOT NULL,
    "paymentTerms" TEXT NOT NULL,
    "agreementStart" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "agreementEnd" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Partner_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Product" (
    "id" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "image" TEXT NOT NULL,

    CONSTRAINT "Product_pkey" PRIMARY KEY ("id")
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
CREATE TABLE "Tool" (
    "id" TEXT NOT NULL,
    "nameRu" TEXT NOT NULL,
    "nameUz" TEXT NOT NULL,
    "nameEn" TEXT NOT NULL,
    "descriptionRu" TEXT NOT NULL,
    "descriptionUz" TEXT NOT NULL,
    "descriptionEn" TEXT NOT NULL,
    "hourlyPrice" INTEGER,
    "dailyPrice" INTEGER,
    "quantity" INTEGER NOT NULL,
    "code" TEXT,
    "brandID" TEXT,
    "capacityID" TEXT,
    "sizeID" TEXT,
    "image" TEXT NOT NULL,
    "isActive" BOOLEAN NOT NULL,

    CONSTRAINT "Tool_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Session" (
    "id" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "ipAddress" TEXT NOT NULL,
    "userAgent" TEXT NOT NULL,
    "device" TEXT NOT NULL,
    "os" TEXT NOT NULL,
    "browser" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductLevel" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "workingHours" INTEGER,
    "hourlyPrice" INTEGER,
    "dailyPrice" INTEGER,
    "levelID" TEXT NOT NULL,

    CONSTRAINT "ProductLevel_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ProductTool" (
    "id" TEXT NOT NULL,
    "productID" TEXT NOT NULL,
    "toolID" TEXT NOT NULL,

    CONSTRAINT "ProductTool_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "User_email_key" ON "User"("email");

-- CreateIndex
CREATE UNIQUE INDEX "Region_nameRu_key" ON "Region"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Region_nameUz_key" ON "Region"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Region_nameEn_key" ON "Region"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_nameRu_key" ON "Brand"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_nameUz_key" ON "Brand"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Brand_nameEn_key" ON "Brand"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_nameRu_key" ON "Capacity"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_nameUz_key" ON "Capacity"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Capacity_nameEn_key" ON "Capacity"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Size_nameRu_key" ON "Size"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Size_nameUz_key" ON "Size"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Size_nameEn_key" ON "Size"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Level_nameRu_key" ON "Level"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Level_nameUz_key" ON "Level"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Level_nameEn_key" ON "Level"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_nameRu_key" ON "Tool"("nameRu");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_nameUz_key" ON "Tool"("nameUz");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_nameEn_key" ON "Tool"("nameEn");

-- CreateIndex
CREATE UNIQUE INDEX "Tool_code_key" ON "Tool"("code");

-- CreateIndex
CREATE UNIQUE INDEX "ProductLevel_productID_levelID_key" ON "ProductLevel"("productID", "levelID");

-- CreateIndex
CREATE UNIQUE INDEX "ProductTool_productID_toolID_key" ON "ProductTool"("productID", "toolID");

-- AddForeignKey
ALTER TABLE "User" ADD CONSTRAINT "User_regionID_fkey" FOREIGN KEY ("regionID") REFERENCES "Region"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Basket" ADD CONSTRAINT "Basket_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_userID_fkey" FOREIGN KEY ("userID") REFERENCES "User"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Comment" ADD CONSTRAINT "Comment_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRating" ADD CONSTRAINT "CommentRating_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "CommentRating" ADD CONSTRAINT "CommentRating_commentID_fkey" FOREIGN KEY ("commentID") REFERENCES "Comment"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "OderMaster" ADD CONSTRAINT "OderMaster_orderID_fkey" FOREIGN KEY ("orderID") REFERENCES "Order"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "MasterJobs" ADD CONSTRAINT "MasterJobs_masterID_fkey" FOREIGN KEY ("masterID") REFERENCES "Master"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_brandID_fkey" FOREIGN KEY ("brandID") REFERENCES "Brand"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_capacityID_fkey" FOREIGN KEY ("capacityID") REFERENCES "Capacity"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Tool" ADD CONSTRAINT "Tool_sizeID_fkey" FOREIGN KEY ("sizeID") REFERENCES "Size"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Session" ADD CONSTRAINT "Session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLevel" ADD CONSTRAINT "ProductLevel_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductLevel" ADD CONSTRAINT "ProductLevel_levelID_fkey" FOREIGN KEY ("levelID") REFERENCES "Level"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTool" ADD CONSTRAINT "ProductTool_productID_fkey" FOREIGN KEY ("productID") REFERENCES "Product"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ProductTool" ADD CONSTRAINT "ProductTool_toolID_fkey" FOREIGN KEY ("toolID") REFERENCES "Tool"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
