# JobFlow_V1 — Gerenciador de Vagas e Candidaturas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)

---

## Sobre

Documentação completa em MD: [`DOCUMENTACAO.md`](./DOCUMENTACAO.md).
Documentação completa em MD: [`DOCUMENTAÇÃO jOBFLOW_V1`](https://docs.google.com/document/d/1fdwRsgpKD-FJLpxf9oLb2CsidAn5bwg3zb60Gg5LsEw/edit?usp=sharing).

O **JobFlow** é uma plataforma web para gerenciamento de vagas de emprego e acompanhamento de candidaturas.

A ideia é pessoal e o projeto existe como **estudo prático** de desenvolvimento Full Stack: organizar, em um só lugar, as vagas encontradas, os dados da empresa, o cargo, o andamento do processo e o contato com o recrutador.

O sistema permitirá que o usuário cadastre candidaturas e acompanhe informações como empresa, cargo, nível, modelo de trabalho, salário, recrutador e status do processo seletivo. O projeto **ainda está em andamento** e não está completo.

A aplicação é **Full Stack**, com frontend em React (Vite), backend em Node.js/Express e banco de dados relacional PostgreSQL.

---

## Objetivo

Centralizar o processo de organização e acompanhamento de candidaturas em uma única plataforma.

O sistema busca facilitar o controle de:

* Vagas encontradas;
* Empresas (como dado da candidatura);
* Candidaturas realizadas;
* Status dos processos seletivos;
* Informações de contato;
* Modelo de trabalho;
* Faixa salarial;
* Datas das candidaturas;
* Filtros padronizados e busca simples (planejados).

---

## Estrutura

```text
JobFlow_V1
│
├── Frontend                 # Interface (React + Vite) — template inicial
│   ├── src
│   │   ├── App.jsx
│   │   └── main.jsx
│   └── package.json
│
├── Backend                  # API REST (Express) — em construção
│   ├── src
│   │   ├── config           # Conexão com PostgreSQL
│   │   ├── models           # Consultas das entidades (Users, Applications)
│   │   └── app.js           # Inicialização do servidor
│   ├── .env.example
│   └── package.json
│
├── Database
│   ├── TABLE
│   │   └── TABLES_DATA_BASE.sql   # Criação das tabelas
│   ├── VIEW
│   │   └── SQL-SELECTS-VIEWS-FILTROS.sql
│   └── INSERTS
│       └── SQLS-INSERTS-Base-Teste.sql
│
├── .gitignore
└── README.md
```

Pastas previstas no backend e no frontend (ainda não criadas): `routes`, `controllers`, `services`, `middlewares`, `components`, `pages`, `hooks`.

---

## Tecnologias

| Tecnologia | Utilização                      |
| ---------- | ------------------------------- |
| React      | Interface do usuário            |
| Vite       | Build e servidor de desenvolvimento do frontend |
| JavaScript | Linguagem principal             |
| Node.js    | Ambiente de execução do backend |
| Express    | Criação da API REST             |
| PostgreSQL | Banco de dados relacional       |
| pg         | Driver de conexão com o PostgreSQL |
| bcrypt     | Hash de senhas (previsto)       |
| JWT        | Autenticação e autorização (previsto) |
| Git        | Controle de versão              |
| GitHub     | Hospedagem do repositório       |

---

## Backend

A API seguirá uma arquitetura organizada em camadas. Hoje existem o servidor Express, a conexão com o banco e os models; rotas, middlewares, controllers e services ainda serão implementados.

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

* **Autenticação** — cadastro, login e sessão com JWT (dependências já no projeto; fluxo ainda não ligado).
* **Usuários** — model com operações de criar, buscar, atualizar e excluir; rotas ainda não expostas.
* **Candidaturas** — model com CRUD e consultas ligadas às views do banco; rotas ainda não expostas.
* **Filtros** — views SQL já definidas; endpoints padronizados ainda serão criados.
* **Busca** — busca simples sobre as candidaturas (planejada).

---

## Banco de Dados

O banco é **PostgreSQL**. O modelo relacional concentra duas entidades principais:

```text
Users
   └── Applications   (ID_USER_FK)
```

Não há tabela separada de empresa ou de vaga: empresa, cargo, setor, cidade, plataforma, salário e demais dados ficam na própria candidatura (`Applications`).

Campos de domínio (com `CHECK` no SQL):

* **Nível:** `INTERN`, `JUNIOR`, `MID`, `SENIOR`
* **Modelo de trabalho:** `REMOTE`, `HYBRID`, `ONSITE`
* **Status:** `SAVED`, `APPLIED`, `INTERVIEW`, `TECHNICAL_TEST`, `APPROVED`, `REJECTED`

Há views para listagem e para filtros:

* `ViewGetAll` — candidaturas ordenadas pela data (mais recentes primeiro)
* `ViewFiltroOne` — recorte de colunas usado em filtros e pesquisa

Scripts:

* [`Database/TABLE/TABLES_DATA_BASE.sql`](./Database/TABLE/TABLES_DATA_BASE.sql)
* [`Database/VIEW/SQL-SELECTS-VIEWS-FILTROS.sql`](./Database/VIEW/SQL-SELECTS-VIEWS-FILTROS.sql)
* [`Database/INSERTS/SQLS-INSERTS-Base-Teste.sql`](./Database/INSERTS/SQLS-INSERTS-Base-Teste.sql)

---

## Autenticação

O sistema utilizará **JWT (JSON Web Token)** para autenticação. A chave `JWT_SECRET` já está prevista no `.env.example`; o fluxo completo (login, emissão de token e rotas protegidas) ainda não está implementado.

Fluxo básico previsto:

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

Rotas protegidas exigirão um token válido para serem acessadas.

---

## Principais funcionalidades

O que já existe no repositório (ainda sem API completa nem interface):

* [x] Esquema do banco (Users e Applications)
* [x] Views de listagem e de filtro
* [x] Conexão Node.js ↔ PostgreSQL
* [x] Models iniciais de usuário e candidatura
* [x] Servidor Express de teste

Previsto:

* [ ] Cadastro de usuário
* [ ] Login
* [ ] Autenticação com JWT
* [ ] Cadastro de candidaturas
* [ ] Edição de candidaturas
* [ ] Exclusão de candidaturas
* [ ] Atualização do status da candidatura
* [ ] Visualização das candidaturas
* [ ] Filtros com rotas padronizadas
* [ ] Busca simples
* [ ] Dashboard de candidaturas
* [ ] Controle de perfil do usuário

---

## Status das candidaturas

Estados previstos no banco (e nos filtros):

```text
Salvo (SAVED)
   ↓
Candidatura (APPLIED)
   ↓
Entrevista (INTERVIEW)
   ↓
Teste técnico (TECHNICAL_TEST)
   ↓
Aprovado (APPROVED)
```

Também é possível representar:

```text
Rejeitado (REJECTED)
```

---

## API

O servidor sobe com uma rota de saúde em `GET /`. Os grupos abaixo são o **padrão previsto** (ainda não implementados). Os filtros terão rotas próprias, no mesmo estilo de nomenclatura.

```text
/api/auth
/api/users
/api/applications
/api/applications/filters
/api/applications/search
```

Exemplo:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/applications
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id

GET    /api/applications/filters?status=&level=&work_model=&company=
GET    /api/applications/search?q=
```

Filtros previstos (query params nas rotas padronizadas): status, nível, modelo de trabalho, empresa, cargo, setor, cidade, plataforma, faixa salarial e intervalo de datas. Ordenação prevista: mais recente, mais antiga, maior salário, menor salário.

---

## Execução

Copie `Backend/.env.example` para `Backend/.env` e preencha usuário, senha, host, porta e nome do banco PostgreSQL, além de `JWT_SECRET` e `PORT`.

Crie as tabelas e, se quiser dados de teste, rode os scripts em `Database/`.

### Backend

```bash
cd Backend
npm install
node src/app.js
```

Por padrão a API escuta em `http://localhost:3000`.

### Frontend

```bash
cd Frontend
npm install
npm run dev
```

O frontend ainda é o template React + Vite; as telas da aplicação serão construídas em seguida.

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
PostgreSQL
```

Essa separação permite desenvolver a interface, a API e o banco de dados de forma independente, mantendo uma arquitetura mais organizada.

---

> Projeto pessoal, em andamento, desenvolvido como estudo prático de Full Stack: APIs REST, autenticação, PostgreSQL e organização em camadas. A ideia e o recorte do produto são do autor.
