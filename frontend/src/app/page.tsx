'use client';

import React, { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./page.module.css";
import { unidadeService } from "@/services/api";
import { UnidadeSaude } from "@/tipos/unidade";

export default function TelaPrincipalPage() {
  const [unidades, setUnidades] = useState<UnidadeSaude[]>([]);
  const [carregando, setCarregando] = useState(true);

  const carregarUnidades = async () => {
    try {
      setCarregando(true);
      const dados = await unidadeService.getAll();
      setUnidades(dados || []);
    } catch (error) {
      console.error("Erro ao buscar unidades do backend, usando array vazio temporário.");
    } finally {
      setCarregando(false);
    }
  };

  useEffect(() => {
    carregarUnidades();
  }, []);

  const handleDeletar = async (id: number) => {
    if (!confirm("Tem certeza que deseja excluir esta unidade?")) return;

    try {
      const resposta = await fetch(`http://localhost:3001/unidades/${id}`, {
        method: "DELETE",
      });

      if (resposta.ok) {
        alert("Unidade excluída com sucesso!");
        carregarUnidades(); 
      } else {
        alert("Erro ao excluir a unidade do banco.");
      }
    } catch (error) {
      alert("Erro de conexão com o servidor backend.");
    }
  };


  const totalUnidades = unidades.length;
  const totalEquipamentos = 0;   
  const totalProfissionais = 0;  
  const totalRecursos = 0.00;    


  return (
    <div className={styles.container}>

      <h2 className={styles.saudacao}>Bem vindo, Gestor (a)!</h2>

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
            <p>{totalEquipamentos} Un.</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcone}>👤</span>
          <div className={styles.cardInfo}>
            <h3>Equipes ativas</h3>
            <p>{totalProfissionais} Un.</p>
          </div>
        </div>

        <div className={styles.card}>
          <span className={styles.cardIcone}>💵</span>
          <div className={styles.cardInfo}>
            <h3>Recursos extras</h3>
            <p>{totalRecursos.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</p>
          </div>
        </div>
      </section>


      <div className={styles.topoAcoes}>
        <h3 className={styles.tituloSecao}>UNIDADES CADASTRADAS</h3>
        
        <div className={styles.zonaFiltros}>
          <Link href="/nova-unidade" className={styles.btnNovaUnidade}>
            Nova Unidade
          </Link>
        </div>
      </div>


      <div className={styles.tabelaContainer}>
        <table className={styles.tabela}>
          <thead>
            <tr>
              <th>CNES</th>
              <th>NOME</th>
              <th>ENDEREÇO</th>
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
                  <button 
                    className={styles.btnAcao} 
                    title="Editar"
                    onClick={() => alert(`Editar a unidade ID: ${unidade.id}`)}
                  >
                    📝
                  </button>

                  <button 
                    className={styles.btnAcao} 
                    title="Excluir"
                    onClick={() => handleDeletar(unidade.id)}
                  >
                    🗑️
                  </button>
                </td>
              </tr>
            ))}
            
            {unidades.length === 0 && (
              <tr>
                <td colSpan={6} style={{ textAlign: "center", padding: "3rem", color: "#666" }}>
                  Nenhuma unidade de saúde cadastrada no banco de dados.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}