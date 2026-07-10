'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { cadastroSchema } from "@/schemas/auth.schema";
import styles from "./create.module.css";

export default function CadastroPage() {
  const router = useRouter();
  const [nome, setNome] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultadoValidacao = cadastroSchema.safeParse({ nome, email, senha });

    if (!resultadoValidacao.success) {
      resultadoValidacao.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const resposta = await fetch(`${apiUrl}/auth/create`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha })
      });

      const dados = await resposta.json();

      if (resposta.ok) {
        toast.success("Conta criada com sucesso!");
        setTimeout(() => {
          router.push("/login");
        }, 1500);
      } else {
        toast.error(dados.message || "Erro ao registrar usuário.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.centroTotal}>
      <Toaster position="top-right" richColors />
      
      <form onSubmit={handleCadastro} className={styles.cardForm}>
        <div className={styles.logoArea}>
          <div className={styles.logoCirculo} />
          <div className={styles.logoTexto}>
            <h1>SisGestor</h1>
            <p className={styles.logoTextoSub1}>SISTEMA GESTOR DE SAÚDE</p>
            <p className={styles.logoTextoSub2}>Unidades de Saúde · Itajubá · MG</p>
          </div>
        </div>

        <h2 className={styles.tituloForm}>CRIE SUA CONTA AQUI:</h2>

        <div className={styles.inputGrupo}>
          <input 
            type="text" 
            placeholder="Nome" 
            value={nome}
            onChange={(e) => setNome(e.target.value)}
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            type="text" 
            placeholder="E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
          />
        </div>

        <button type="submit" className={styles.btnCadastrar}>CADASTRE-SE</button>

        <p className={styles.linkAlternativo}>
          Já possui login? <Link href="/login">Entre aqui.</Link>
        </p>
      </form>
    </div>
  );
}