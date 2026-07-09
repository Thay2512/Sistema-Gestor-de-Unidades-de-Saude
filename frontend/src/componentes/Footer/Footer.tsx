import React from 'react';
import styles from './Footer.module.css';


export default function Footer() {
  return (
    <footer className={styles.footer}>
      <p>
        SisGestor &copy; {new Date().getFullYear()} - Desenvolvido por{' '}
        <a 
          href="https://github.com/Thay2512" 
          target="_blank" 
          rel="noopener noreferrer" 
          className={styles.linkGithub}
        >
          Thayane Araujo de Castro
        </a>
      </p>
    </footer>
  );
}