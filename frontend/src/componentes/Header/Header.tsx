'use client';

import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      {/* Lado Esquerdo: Apenas a Logo Oficial Completa */}
      <div className={styles.logoContainer}>
        <img 
          src="/logo.png" 
          alt="SisGestor Logo" 
          className={styles.logoImagem} 
        />
      </div>

      {/* Lado Direito: API e Ação */}
      <div className={styles.menuDireito}>
        <span className={styles.statusApi}>API - CNES</span>
        <button className={styles.botaoSair} onClick={() => alert('Saindo...')}>
          SAIR
        </button>
      </div>
    </header>
  );
}