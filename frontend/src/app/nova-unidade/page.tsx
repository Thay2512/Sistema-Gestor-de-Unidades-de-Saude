'use client';

import React, { useEffect, useState, Suspense } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { toast, Toaster } from "sonner";
import styles from "./page.module.css";

function FormularioUnidade() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const idEdicao = searchParams.get("id");
  const ehEdicao = !!idEdicao;

  const [cnes, setCnes] = useState("");
  const [nome, setNome] = useState("");
  const [tipo, setTipo] = useState("");
  const [endereco, setEndereco] = useState("");
  const [turno, setTurno] = useState("");

  useEffect(() => {
    const logado = localStorage.getItem("sisgestor_logado");
    if (!logado) {
      router.push("/login");
      return;
    }

    if (ehEdicao && idEdicao) {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      fetch(`${apiUrl}/unidades/${idEdicao}`, { credentials: "include" })
        .then((res) => {
          if (res.status === 401 || res.status === 403) {
            router.push("/login");
            return;
          }
          return res.json();
        })
        .then((dados) => {
          if (!dados) return;
          setCnes(String(dados.cnes));
          setNome(dados.nome);
          setTipo(dados.tipo);
          setEndereco(dados.endereco);
          setTurno(dados.turno);
        })
        .catch(() => toast.error("Falha ao recuperar dados para edição."));
    }
  }, [ehEdicao, idEdicao, router]);

  const handleSalvar = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!cnes || !nome || !tipo || !endereco || !turno) {
      toast.error("Por favor, preencha todos os campos obrigatórios.");
      return;
    }

    const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
    const url = ehEdicao ? `${apiUrl}/unidades/${idEdicao}` : `${apiUrl}/unidades`;
    const metodo = ehEdicao ? "PUT" : "POST";

    try {
      const resposta = await fetch(url, {
        method: metodo,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ cnes: Number(cnes), nome, tipo, endereco, turno }),
        credentials: "include"
      });

      if (resposta.ok) {
        toast.success("Registro salvo com sucesso!");
        setTimeout(() => router.push("/"), 1200);
      } else {
        const erroJson = await resposta.json();
        toast.error(erroJson.error || "Inconsistência nos dados enviados.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com a API.");
    }
  };

  return (
    <form onSubmit={handleSalvar} className={styles.formulario}>
      <h2>{ehEdicao ? "Editar Unidade de Saúde" : "Cadastrar Nova Unidade"}</h2>
      
      <div className={styles.inputGrupo}>
        <label>Código CNES *</label>
        <input type="number" value={cnes} onChange={(e) => setCnes(e.target.value)} disabled={ehEdicao} />
      </div>

      <div className={styles.inputGrupo}>
        <label>Nome da Unidade *</label>
        <input type="text" value={nome} onChange={(e) => setNome(e.target.value)} />
      </div>

      <div className={styles.inputGrupo}>
        <label>Tipo de Estabelecimento *</label>
        <input type="text" placeholder="Ex: Posto de Saúde, UBS, Hospital" value={tipo} onChange={(e) => setTipo(e.target.value)} />
      </div>

      <div className={styles.inputGrupo}>
        <label>Endereço Completo *</label>
        <input type="text" value={endereco} onChange={(e) => setEndereco(e.target.value)} />
      </div>

      <div className={styles.inputGrupoLast}>
        <label>Turno de Atendimento *</label>
        <input type="text" placeholder="Ex: Matutino, Vespertino, 24 horas" value={turno} onChange={(e) => setTurno(e.target.value)} />
      </div>

      <div className={styles.acoesGrupo}>
        <button type="button" onClick={() => router.push("/")} className={styles.btnCancelar}>Cancelar</button>
        <button type="submit" className={styles.btnSalvar}>Salvar Registro</button>
      </div>
    </form>
  );
}

export default function NovaUnidadePage() {
  return (
    <div className={styles.pageContainer}>
      <Toaster position="top-right" richColors />
      
      <header className={styles.header}>
        <h1>SisGestor Saúde</h1>
      </header>

      <main className={styles.mainContent}>
        <Suspense fallback={<p>Carregando formulário...</p>}>
          <FormularioUnidade />
        </Suspense>
      </main>

      <footer className={styles.footer}>
        <p>&copy; 2026 SisGestor - Sistema Integrado de Saúde. Todos os direitos reservados.</p>
      </footer>
    </div>
  );
}