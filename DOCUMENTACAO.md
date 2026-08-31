# JobFlow_V1 — Gerenciador de Vagas e Candidaturas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-autenticação-purple)
![bcrypt](https://img.shields.io/badge/bcrypt-segurança-orange)

---

## Sobre

Documentação completa em MD: [`DOCUMENTACAO.md`](./DOCUMENTACAO.md).

O **JobFlow** é uma aplicação web para centralizar o acompanhamento de vagas e candidaturas.

O projeto é pessoal e tem como objetivo servir como estudo prático de desenvolvimento Full Stack, envolvendo desenvolvimento de API REST, banco de dados relacional, autenticação, organização de código e integração entre frontend e backend.

A plataforma foi pensada para permitir que o usuário registre suas candidaturas e acompanhe informações como:

- Empresa;
- Cargo;
- Setor;
- Nível da vaga;
- Modelo de trabalho;
- Salário;
- Recrutador;
- Contato;
- Status do processo seletivo;
- Data da candidatura;
- Link da vaga;
- Observações.

O projeto ainda está em desenvolvimento.

Atualmente, a estrutura do banco de dados, conexão com PostgreSQL, models e a estrutura inicial do backend já foram desenvolvidas. A implementação da autenticação JWT, proteção das rotas e integração completa entre frontend e backend ainda está em andamento.

---

# Objetivo

Centralizar o processo de organização e acompanhamento de candidaturas em uma única plataforma.

O JobFlow busca facilitar o controle de:

- Vagas encontradas;
- Empresas;
- Candidaturas realizadas;
- Status dos processos seletivos;
- Informações de contato;
- Modelo de trabalho;
- Faixa salarial;
- Datas das candidaturas;
- Links das vagas;
- Observações;
- Filtros acumulativos;
- Busca;
- Visão geral das candidaturas.

O sistema é organizado por usuário, permitindo que cada usuário possua suas próprias candidaturas.

Não existem tabelas separadas para empresas ou vagas. As informações relacionadas à vaga ficam armazenadas diretamente na tabela `Applications`, que possui relacionamento com `Users`.

---

# Estrutura do projeto

```text
JobFlow_V1
│
├── Frontend
│   ├── src
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend
│   ├── src
│   │   ├── config
│   │   │   └── database.js
│   │   │
│   │   ├── controllers
│   │   │   ├── UserController.js
│   │   │   ├── ApplicationController.js
│   │   │   └── AuthController.js
│   │   │
│   │   ├── middleware
│   │   │   └── authMiddleware.js
│   │   │
│   │   ├── models
│   │   │   ├── UserModels.js
│   │   │   └── ApplicationModels.js
│   │   │
│   │   ├── routes
│   │   │   ├── UserRoutes.js
│   │   │   ├── ApplicationRoutes.js
│   │   │   └── AuthRoutes.js
│   │   │
│   │   ├── services
│   │   │   └── AuthService.js
│   │   │
│   │   ├── utils
│   │   │   └── generateToken.js
│   │   │
│   │   └── app.js
│   │
│   ├── .env.example
│   └── package.json
│
├── Database
│   ├── TABLE
│   │   └── TABLES_DATA_BASE.sql
│   │
│   ├── VIEW
│   │   └── SQL-SELECTS-VIEWS-FILTROS.sql
│   │
│   └── INSERTS
│       └── SQLS-INSERTS-Base-Teste.sql
│
├── NOTIONS
│
├── .gitignore
├── README.md
└── DOCUMENTACAO.md
