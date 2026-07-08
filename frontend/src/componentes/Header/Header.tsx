'use client'; 

import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  const handleSair = () => {
    alert('Saindo do sistema...');
  };

  return (
    <header className={styles.header}>
      {/* Lado Esquerdo: Logo e Identificação */}
      <div className={styles.logoContainer}>
        <div className={styles.logoIcone}></div>
        <div>
          <h1 className={styles.tituloLogo}>
            Sis<span>Gestor</span>
          </h1>
          <span className={styles.subtituloLogo}>
            SISTEMA GESTOR DE SAÚDE • Unidades de Saúde - Itajubá - MG
          </span>
        </div>
      </div>

      {/* Lado Direito: Link da API e Botão Sair */}
      <div className={styles.menuDireito}>
        <span className={styles.statusApi}>API - CNES</span>
        <button className={styles.botaoSair} onClick={handleSair}>
          SAIR
        </button>
      </div>
    </header>
  );
}