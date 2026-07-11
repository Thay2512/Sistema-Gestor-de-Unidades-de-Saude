'use client';

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { toast, Toaster } from "sonner";
import { loginSchema } from "@/schemas/auth.schema";
import styles from "./login.module.css";

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [senha, setSenha] = useState("");

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    const resultadoValidacao = loginSchema.safeParse({ email, senha });

    if (!resultadoValidacao.success) {
      resultadoValidacao.error.issues.forEach((issue) => {
        toast.error(issue.message);
      });
      return;
    }

    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3001";
      const resposta = await fetch(`${apiUrl}/auth/login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, senha }),
        credentials: "include"
      });

      const dados = await resposta.json();

      if (resposta.ok && dados.success) {
        localStorage.setItem("sisgestor_logado", "true");
        toast.success("Acesso concedido com sucesso!");
        setTimeout(() => {
          router.push("/");
        }, 1000);
      } else {
        toast.error(dados.message || "Credenciais inválidas.");
      }
    } catch (error) {
      toast.error("Erro ao conectar com o servidor.");
    }
  };

  return (
    <div className={styles.authContainer}>
      <Toaster position="top-right" richColors />
      
      <div className={styles.ladoEsquerdo}>
        
        <h2 className={styles.boasVindas}>
          SEJA BEM VINDO AO SEU:<br />
          <span className={styles.destaqueLaranja}>SISTEMA<br />GESTOR DE SAÚDE</span>
        </h2>
      </div>

      <div className={styles.ladoDireito}>
        <form onSubmit={handleLogin} className={styles.cardForm}>
          <h2 className={styles.tituloForm}>ACESSE SUA CONTA AQUI:</h2>
          
          <div className={styles.inputGrupo}>
            <input 
              type="text" 
              placeholder="Login" 
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

          <p className={styles.linkAlternativo}>
            Não tem uma conta? <Link href="/create">Cadastre-se aqui.</Link>
          </p>

          <button type="submit" className={styles.btnEntrar}>ENTRAR</button>
        </form>
      </div>
    </div>
  );
}