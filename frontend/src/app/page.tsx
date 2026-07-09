import React from "react";
import styles from "./page.module.css";
import { unidadeService } from "@/services/api";
import { UnidadeSaude } from "@/tipos/unidade";

export default async function TelaPrincipalPage() {
  let unidades: UnidadeSaude[] = [];

  try {
    unidades = await unidadeService.getAll();
  } catch (error) {
    console.error("Erro ao buscar unidades do backend, usando array vazio.");
  }

  const totalUnidades = unidades.length;

  return (
    <div className={styles.container}>
      {/* Saudação */}
      <h2 className={styles.saudacao}>Bem vindo, Gestor (a)!</h2>

      {/* 📊 Seção dos 4 Cards de Indicadores */}
      <section className={styles.cardsGrid}>
        <div className={styles.card}>
          <span className={styles.cardIcone}>🏠</span>
          <div className={styles.cardInfo}>
            <h3>Unidades cadastradas</h3>
            <p>{totalUnidades} Un.</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcone}>📋</span>
          <div className={styles.cardInfo}>
            <h3>Equipamentos ativos</h3>
            <p>XX Un.</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcone}>👤</span>
          <div className={styles.cardInfo}>
            <h3>Profissionais ativos</h3>
            <p>XX Un.</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcone}>💵</span>
          <div className={styles.cardInfo}>
            <h3>Recursos extras</h3>
            <p>R$ XX,XX</p>
          </div>
        </div>
      </section>

      {/* 📋 Cabeçalho da Lista e Ações */}
      <div className={styles.topoAcoes}>
        <h3 className={styles.tituloSecao}>UNIDADES CADASTRADAS</h3>
        
        <div className={styles.zonaFiltros}>
          <input 
            type="text" 
            placeholder="Pesquisar por nome ou CNES" 
            className={styles.inputBusca}
          />
          <button className={styles.btnNovaUnidade}>Nova Unidade</button>
        </div>
      </div>

      {/* 🗂️ Tabela de Unidades */}
      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>CNES</th>
              <th>NOME</th>
              <th>BAIRRO</th>
              <th>TURNO</th>
              <th>TELEFONE</th>
              <th>AÇÕES</th>
            </tr>
          </thead>
          <tbody>
            {unidades.map((unidade) => (
              <tr key={unidade.id}>
                <td>{unidade.cnes}</td>
                <td style={{ fontWeight: 500 }}>{unidade.nome}</td>
                <td>{unidade.endereco}</td>
                <td>{unidade.turno}</td>
                <td>{unidade.telefone || "-"}</td>
                <td>
                  <button className={styles.btnAcao} title="Editar">📝</button>
                  <button className={styles.btnAcao} title="Excluir">🗑️</button>
                </td>
              </tr>
            ))}
            
            {unidades.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                  Nenhuma unidade de saúde encontrada no sistema.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}