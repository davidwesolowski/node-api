-- AlterTable
ALTER TABLE "Product" ALTER COLUMN "createdAt" SET DEFAULT CURRENT_TIMESTAMP;

-- CreateIndex
CREATE INDEX "Product_id_userId_idx" ON "Product"("id", "userId");
