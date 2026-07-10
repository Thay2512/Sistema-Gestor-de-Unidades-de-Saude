/*
  Warnings:

  - The primary key for the `UnidadeSaude` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to alter the column `cnes` on the `UnidadeSaude` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.
  - You are about to alter the column `id` on the `UnidadeSaude` table. The data in that column could be lost. The data in that column will be cast from `String` to `Int`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_UnidadeSaude" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "cnes" INTEGER NOT NULL,
    "nome" TEXT NOT NULL,
    "tipo" TEXT NOT NULL,
    "turno" TEXT NOT NULL,
    "endereco" TEXT NOT NULL,
    "telefone" TEXT,
    "observacoes" TEXT,
    "equipes" TEXT,
    "equipamentos" TEXT,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP
);
INSERT INTO "new_UnidadeSaude" ("cnes", "createdAt", "endereco", "equipamentos", "equipes", "id", "nome", "observacoes", "telefone", "tipo", "turno") SELECT "cnes", "createdAt", "endereco", "equipamentos", "equipes", "id", "nome", "observacoes", "telefone", "tipo", "turno" FROM "UnidadeSaude";
DROP TABLE "UnidadeSaude";
ALTER TABLE "new_UnidadeSaude" RENAME TO "UnidadeSaude";
CREATE UNIQUE INDEX "UnidadeSaude_cnes_key" ON "UnidadeSaude"("cnes");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
