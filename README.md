# SisGestor 🏥 - Sistema Gestor de Unidades de Saúde
O **SisGestor** é uma aplicação Full Stack desenvolvida para o gerenciamento de Unidades de Saúde de Itajubá - MG. O sistema permite o controle completo de estabelecimentos de saúde, servindo como base para a administração de postos de atendimento por parte da gestão municipal.

## 🚀 Funcionalidades Principais
* **Dashboard de Indicadores:** Monitoramento em tempo real do total de unidades cadastradas.
* **Consulta Automatizada via CNES:** Integração com API externa para autopreenchimento de dados cadastrais nacionais do SUS.
* **CRUD Completo de Unidades:** Listagem, cadastro detalhado, atualização dinâmica (reutilizando o mesmo formulário) e exclusão de registros diretamente no painel.
* **Persistência Local:** Armazenamento seguro de dados básicos, equipes atuantes, equipamentos e notas gerais.

## 🛠️ Tecnologias Utilizadas

### Frontend
* **Framework:** Next.js (App Router)
* **Linguagem:** TypeScript
* **Estilização:** CSS Modules (Design responsivo e modularizado)
* **Gerenciamento de Estado:** React Hooks (`useState`, `useEffect`) para interatividade em tempo real (`'use client'`).

### Backend
* **Runtime:** Node.js
* **Framework:** Express
* **Linguagem:** TypeScript
* **ORM:** Prisma (Banco de dados mapeado por código)
* **Banco de Dados:** SQLite (Armazenamento leve em arquivo local `app.db`)
* **Segurança/Integração:** CORS habilitado para comunicação segura entre cliente e servidor

# 🎨 Protótipo do Design

O planejamento visual da interface foi desenvolvido no Figma, definindo uma identidade moderna e fluida para o gestor de saúde. Abaixo está a demonstração das telas do sistema:

Tela de login
<img width="1440" height="1024" alt="Image" src="https://github.com/user-attachments/assets/c34af42d-2a85-454e-920a-214bf1728ed0" />

Tela de cadastro
<img width="1440" height="1024" alt="Image" src="https://github.com/user-attachments/assets/897cc4f0-1cd0-44cd-b33e-bc970282f76f" />

Tela principal
<img width="1440" height="1024" alt="Image" src="https://github.com/user-attachments/assets/bab5ac1e-9694-4b44-b74f-8083df2cc7be" />
