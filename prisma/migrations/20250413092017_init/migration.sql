/*
  Warnings:

  - A unique constraint covering the columns `[code]` on the table `Tool` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Tool_code_key" ON "Tool"("code");
