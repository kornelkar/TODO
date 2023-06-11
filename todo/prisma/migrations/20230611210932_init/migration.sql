-- CreateTable
CREATE TABLE "Todo" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "title" TEXT,
    "text" TEXT,
    "dateAdd" TEXT
);

-- CreateIndex
CREATE UNIQUE INDEX "Todo_title_key" ON "Todo"("title");
