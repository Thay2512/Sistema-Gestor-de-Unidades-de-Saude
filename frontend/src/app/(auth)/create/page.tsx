'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { cadastroSchema } from "@/schemas/auth.schema";
import styles from "./create.module.css";

export default function CadastroPage() {
  const router = useRouter();
  const [usuario, setUsuario] = useState("");
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");
  const [confirmarSenha, setConfirmarSenha] = useState("");

  const handleCadastro = async (e: React.FormEvent) => {
    e.preventDefault();

    // 1. Validação local: confirmação de senha
    if (senha !== confirmarSenha) {
      toast.error("As senhas não coincidem.");
      return;
    }

    // 2. Validação com o schema (espera { usuario, email, senha })
    const resultadoValidacao = cadastroSchema.safeParse({ usuario, email, senha });

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
        body: JSON.stringify({ usuario, email, senha })
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
        

        <h2 className={styles.tituloForm}>CRIE SUA CONTA AQUI:</h2>

        <div className={styles.inputGrupo}>
          <input 
            type="text" 
            placeholder="Usuário" 
            value={usuario}
            onChange={(e) => setUsuario(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            type="email" 
            placeholder="E-mail" 
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            type="password" 
            placeholder="Senha" 
            value={senha}
            onChange={(e) => setSenha(e.target.value)}
            required
          />
        </div>

        <div className={styles.inputGrupo}>
          <input 
            type="password" 
            placeholder="Confirmar senha" 
            value={confirmarSenha}
            onChange={(e) => setConfirmarSenha(e.target.value)}
            required
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
