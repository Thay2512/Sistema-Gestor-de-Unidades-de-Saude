'use client';

import React from 'react';
import styles from './Header.module.css';

export default function Header() {
  return (
    <header className={styles.header}>
      <div className={styles.logoContainer}>
        <img 
          src="/logo.png" 
          alt="SisGestor Logo" 
          className={styles.logoImagem} 
        />
      </div>

      <div className={styles.menuDireito}>

        <a href="https://dadosabertos.saude.gov.br/dataset/cnes-cadastro-nacional-de-estabelecimentos-de-saude" className={styles.statusApi}>
          API - CNES
        </a>

        <button className={styles.botaoSair} onClick={() => alert('Saindo...')}>
          SAIR
        </button>
      </div>
    </header>
  );
}