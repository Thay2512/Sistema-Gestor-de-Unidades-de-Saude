-- CreateTable
CREATE TABLE "UnidadeSaude" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "cnes" TEXT NOT NULL,
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

-- CreateIndex
CREATE UNIQUE INDEX "UnidadeSaude_cnes_key" ON "UnidadeSaude"("cnes");
