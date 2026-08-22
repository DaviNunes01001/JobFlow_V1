# JobFlow_V1 — Gerenciador de Vagas e Candidaturas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)

---

## Sobre

O **JobFlow** é uma plataforma web para gerenciamento de vagas de emprego e acompanhamento de candidaturas.

O sistema permite que o usuário cadastre vagas, registre suas candidaturas e acompanhe informações como empresa, cargo, nível, modelo de trabalho, salário, recrutador e status do processo seletivo.

O projeto é desenvolvido como uma aplicação **Full Stack**, com frontend em React, backend em Node.js/Express e banco de dados relacional.

---

## Objetivo

Centralizar o processo de organização e acompanhamento de candidaturas em uma única plataforma.

O sistema busca facilitar o controle de:

* Vagas encontradas;
* Empresas;
* Candidaturas realizadas;
* Status dos processos seletivos;
* Informações de contato;
* Modelo de trabalho;
* Faixa salarial;
* Datas das candidaturas.

---

## Estrutura

```text
JobFlow
│
├── frontend                 # Interface da aplicação
│   ├── src
│   │   ├── components       # Componentes reutilizáveis
│   │   ├── pages            # Páginas da aplicação
│   │   ├── services         # Comunicação com a API
│   │   ├── hooks             # Hooks personalizados
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── backend                  # API REST
│   ├── src
│   │   ├── config           # Configurações e conexão com banco
│   │   ├── controllers      # Controle das requisições
│   │   ├── middlewares      # Autenticação e tratamentos
│   │   ├── models            # Modelos das entidades
│   │   ├── routes            # Rotas da API
│   │   ├── services          # Regras de negócio
│   │   ├── utils             # Funções auxiliares
│   │   └── server.js         # Inicialização do servidor
│   ├── .env                 # Variáveis de ambiente
│   └── package.json
│
├── database
│   └── TABLES_DATA_BASE.sql # Estrutura do banco de dados
│
├── .gitignore
└── README.md
```

---

## Tecnologias

| Tecnologia | Utilização                      |
| ---------- | ------------------------------- |
| React      | Interface do usuário            |
| JavaScript | Linguagem principal             |
| Node.js    | Ambiente de execução do backend |
| Express    | Criação da API REST             |
| MySQL      | Banco de dados relacional       |
| JWT        | Autenticação e autorização      |
| Git        | Controle de versão              |
| GitHub     | Hospedagem do repositório       |

---

## Backend

A API segue uma arquitetura organizada em camadas:

```text
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Services
   ↓
Models
   ↓
Database
```

### Principais módulos

* **Autenticação** — cadastro, login e gerenciamento de sessão através de JWT.
* **Usuários** — gerenciamento dos usuários da plataforma.
* **Vagas** — cadastro e gerenciamento de oportunidades.
* **Candidaturas** — registro e acompanhamento das candidaturas.
* **Status** — acompanhamento da evolução dos processos seletivos.

---

## Banco de Dados

O banco de dados utiliza um modelo relacional para armazenar as principais entidades do sistema.

Entre elas:

```text
USER
JOB
APPLICATION
COMPANY
```

As tabelas possuem relacionamentos por meio de **chaves primárias e estrangeiras**, garantindo a integridade dos dados.

A estrutura inicial do banco está disponível em:

[`database/TABLES_DATA_BASE.sql`](./database/TABLES_DATA_BASE.sql)

---

## Autenticação

O sistema utiliza **JWT (JSON Web Token)** para autenticação.

Fluxo básico:

```text
Usuário
   ↓
Login
   ↓
API
   ↓
Validação das credenciais
   ↓
JWT
   ↓
Frontend
   ↓
Requisições autenticadas
```

Rotas protegidas exigem um token válido para serem acessadas.

---

## Principais funcionalidades

* [ ] Cadastro de usuário
* [ ] Login
* [ ] Autenticação com JWT
* [ ] Cadastro de vagas
* [ ] Edição de vagas
* [ ] Exclusão de vagas
* [ ] Cadastro de candidaturas
* [ ] Atualização do status da candidatura
* [ ] Visualização das candidaturas
* [ ] Gerenciamento de empresas
* [ ] Filtros de vagas
* [ ] Dashboard de candidaturas
* [ ] Controle de perfil do usuário

---

## Status das candidaturas

O sistema poderá utilizar diferentes estados para representar o andamento de cada candidatura:

```text
Aplicado
   ↓
Em análise
   ↓
Entrevista
   ↓
Aprovado
```

Também será possível representar situações como:

```text
Rejeitado
Cancelado
```

---

## API

Principais grupos de endpoints:

```text
/api/auth
/api/users
/api/jobs
/api/applications
/api/companies
```

Exemplo:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/applications
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id
```

---

## Execução

### Backend

```bash
cd backend
npm install
npm run dev
```

### Frontend

```bash
cd frontend
npm install
npm run dev
```

As variáveis de ambiente do backend devem ser configuradas no arquivo `.env`.

---

## Organização do projeto

O projeto é dividido em três partes principais:

```text
Frontend
   │
   │ HTTP / JSON
   ▼
Backend / API
   │
   │ SQL
   ▼
MySQL
```

Essa separação permite desenvolver a interface, a API e o banco de dados de forma independente, mantendo uma arquitetura mais organizada e escalável.

---

> Projeto desenvolvido para fins acadêmicos e de estudo, com foco em desenvolvimento Full Stack, APIs REST, autenticação, banco de dados relacional e arquitetura de software.
