'use client';

import React, { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import styles from "./page.module.css";

export default function DashboardPage() {
  const router = useRouter();
  const [unidades, setUnidades] = useState([]);
  const [carregando, setCarregando] = useState(true);

  const carregarUnidades = async () => {
    try {
      setCarregando(true);
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const resposta = await fetch(`${apiUrl}/unidades`, {
        credentials: "include"
      });
      
      if (resposta.status === 401 || resposta.status === 403) {
        localStorage.clear();
        router.push("/login");
        return;
      }

      const dados = await resposta.json();
      setUnidades(dados || []);
    } catch (error) {
      toast.error("Erro ao carregar os dados do servidor.");
    } finally {
      setCarregando(false);
    }
  };

  const handleLogout = async () => {
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      await fetch(`${apiUrl}/auth/logout`, {
        method: "POST",
        credentials: "include"
      });
      localStorage.clear();
      toast.success("Desconectado com sucesso.");
      setTimeout(() => router.push("/login"), 1000);
    } catch (error) {
      toast.error("Falha ao efetuar logout.");
    }
  };

  const handleDeletar = async (id: number) => {
    if (!confirm("Deseja realmente remover esta unidade?")) return;

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const resposta = await fetch(`${apiUrl}/unidades/${id}`, {
        method: "DELETE",
        credentials: "include"
      });

      if (resposta.ok) {
        toast.success("Unidade removida com sucesso.");
        carregarUnidades();
      } else {
        toast.error("Erro ao remover o recurso.");
      }
    } catch (error) {
      toast.error("Falha na conexão.");
    }
  };

  useEffect(() => {
    const logado = localStorage.getItem("sisgestor_logado");
    if (!logado) {
      router.push("/login");
    } else {
      carregarUnidades();
    }
  }, [router]);

  return (
    <div className={styles.dashboardContainer}>
      <Toaster position="top-right" richColors />
      
      <header className={styles.header}>
        <h1>SisGestor Saúde</h1>
        <button onClick={handleLogout} className={styles.btnLogout}>Sair (Logout)</button>
      </header>
      
      <main className={styles.mainContent}>
        <div className={styles.topBar}>
          <h2>Gerenciamento de Unidades de Saúde</h2>
          <Link href="/nova-unidade" className={styles.btnNovaUnidade}>+ Nova Unidade</Link>
        </div>

        {carregando ? (
          <p>Carregando registros...</p>
        ) : unidades.length === 0 ? (
          <div className={styles.emptyState}>
            <p>Nenhuma unidade cadastrada pelo seu usuário ainda.</p>
          </div>
        ) : (
          <div className={styles.gridUnidades}>
            {unidades.map((unidade: any) => (
              <div key={unidade.id} className={styles.cardUnidade}>
                <h3>{unidade.nome}</h3>
                <p><strong>CNES:</strong> {unidade.cnes}</p>
                <p><strong>Tipo:</strong> {unidade.tipo}</p>
                <p><strong>Endereço:</strong> {unidade.endereco}</p>
                <p><strong>Turno:</strong> {unidade.turno}</p>
                
                <div className={styles.acoes}>
                  <Link href={`/nova-unidade?id=${unidade.id}`} className={styles.btnEditar}>Editar</Link>
                  <button onClick={() => handleDeletar(unidade.id)} className={styles.btnExcluir}>Excluir</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 SisGestor - Sistema Integrado de Saúde. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}