/*
  Warnings:

  - A unique constraint covering the columns `[idMarvelApi]` on the table `Character` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMarvelApi]` on the table `Comic` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[idMarvelApi]` on the table `Serie` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Character_idMarvelApi_key" ON "Character"("idMarvelApi");

-- CreateIndex
CREATE UNIQUE INDEX "Comic_idMarvelApi_key" ON "Comic"("idMarvelApi");

-- CreateIndex
CREATE UNIQUE INDEX "Serie_idMarvelApi_key" ON "Serie"("idMarvelApi");
