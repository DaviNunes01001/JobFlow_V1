![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)

# JobFlow — Documentação geral

Documento de visão do projeto: o que é, como está organizado, o que já existe no repositório e o que ainda será construído.

O **JobFlow** é uma aplicação web para centralizar o acompanhamento de vagas e candidaturas. É um projeto pessoal e de estudo Full Stack: React (Vite) no frontend, Node.js/Express na API e PostgreSQL no banco.

Status atual: **em desenvolvimento**. O banco e os models iniciais existem; a API de negócio e a interface ainda não.

---

## 1. Problema que o produto resolve

Quem está em busca de emprego costuma espalhar informações em planilhas, e-mails e anotações: empresa, cargo, data, status, recrutador, salário, link da vaga.

O JobFlow concentra isso em um só lugar, por usuário autenticado, com:

- cadastro e edição de candidaturas;
- status do processo seletivo;
- dados da empresa, cargo, nível e modelo de trabalho;
- contato do recrutador;
- filtros e busca;
- visão geral (dashboard).

Não há tabelas separadas de “empresa” ou “vaga”. Tudo fica na candidatura (`Applications`), ligada ao usuário (`Users`).

---

## 2. Arquitetura

```text
Navegador (React + Vite)
        │  HTTP / JSON
        ▼
API (Express)
        │  SQL (pg)
        ▼
PostgreSQL
```

| Camada     | Pasta        | Função                                      | Situação                          |
| ---------- | ------------ | ------------------------------------------- | --------------------------------- |
| Interface  | `Frontend/`  | Telas, autenticação visual, dashboard       | Template Vite; `App.jsx` vazio    |
| API        | `Backend/`   | REST, JWT, regras de negócio                | Servidor de teste + models        |
| Dados      | `Database/`  | Tabelas, views e inserts de exemplo         | Scripts SQL prontos               |

Fluxo previsto no backend (ainda incompleto):

```text
Rotas → Middlewares (JWT, validação) → Controllers → Services → Models → PostgreSQL
```

Pastas ainda não criadas (previstas): `routes`, `controllers`, `services`, `middlewares` no backend; `components`, `pages`, `hooks`, `contexts`, `services` no frontend.

---

## 3. Estrutura do repositório

```text
JobFlow_V1/
├── Frontend/                 # React 19 + Vite 8
│   ├── src/
│   │   ├── App.jsx           # ainda vazio
│   │   ├── main.jsx
│   │   ├── App.css
│   │   └── index.css
│   ├── index.html
│   ├── vite.config.js
│   └── package.json
│
├── Backend/
│   ├── src/
│   │   ├── app.js            # Express + GET /
│   │   ├── config/
│   │   │   └── database.js   # Pool pg via .env
│   │   └── models/
│   │       ├── UserModels.js
│   │       └── ApplicationModels.js
│   ├── .env.example
│   └── package.json
│
├── Database/
│   ├── TABLE/TABLES_DATA_BASE.sql
│   ├── VIEW/SQL-SELECTS-VIEWS-FILTROS.sql
│   └── INSERTS/SQLS-INSERTS-Base-Teste.sql
│
├── NOTIONS/                  # anotações internas (filtros, fluxo de git)
├── README.md
└── DOCUMENTACAO.md           # este arquivo
```

---

## 4. Banco de dados

SGBD: **PostgreSQL**. Scripts em `Database/`.

### 4.1 Relacionamento

```text
Users (1) ──────── (N) Applications
         ID_USER ← ID_USER_FK
```

### 4.2 Tabela `Users`

| Coluna           | Tipo           | Observação        |
| ---------------- | -------------- | ----------------- |
| `ID_USER`        | `SERIAL PK`    |                   |
| `NAME_USER`      | `VARCHAR(100)` | obrigatório       |
| `EMAIL`          | `VARCHAR(255)` | único, obrigatório|
| `PASSOWORD_HASH` | `VARCHAR(255)` | hash da senha     |
| `CREATE_AT`      | `TIMESTAMP`    |                   |
| `UPDATED_T`      | `TIMESTAMP`    |                   |

Os nomes `PASSOWORD_HASH`, `CREATE_AT` e `UPDATED_T` são os do esquema atual (incluindo a grafia). Qualquer mudança de nomenclatura precisa ser feita no SQL e nos models juntos.

### 4.3 Tabela `Applications`

| Coluna              | Tipo            | Observação                          |
| ------------------- | --------------- | ----------------------------------- |
| `ID_APP`            | `SERIAL PK`     |                                     |
| `ID_USER_FK`        | `INT`           | FK para `Users(ID_USER)`            |
| `COMPANY`           | `VARCHAR(150)`  | obrigatório                         |
| `SECTOR`            | `VARCHAR(150)`  |                                     |
| `COMPANY_LINKEDIN`  | `VARCHAR(500)`  |                                     |
| `CITY`              | `VARCHAR(100)`  |                                     |
| `PLATFORM`          | `VARCHAR(100)`  | ex.: LinkedIn, Gupy, site           |
| `JOB_TITLE`         | `VARCHAR(150)`  | obrigatório                         |
| `LEVEL`             | `VARCHAR(50)`   | `CHECK` — ver enums abaixo          |
| `WORK_MODEL`        | `VARCHAR(30)`   | `CHECK`                             |
| `APPLICATION_DATE`  | `DATE`          | obrigatório                         |
| `STATUS`            | `VARCHAR(50)`   | obrigatório, `CHECK`                |
| `RECRUITER`         | `VARCHAR(150)`  |                                     |
| `CONTACT`           | `VARCHAR(255)`  |                                     |
| `SALARY`            | `DECIMAL(10,2)` |                                     |
| `JOB_URL`           | `VARCHAR(500)`  |                                     |
| `NOTES`             | `TEXT`          |                                     |
| `CREATED_AT`        | `TIMESTAMP`     | default `CURRENT_TIMESTAMP`         |
| `UPDATED_AT`        | `TIMESTAMP`     | default `CURRENT_TIMESTAMP`         |

### 4.4 Valores de domínio (enums no `CHECK`)

**Nível (`LEVEL`)**

| Código no banco | Significado na UI |
| --------------- | ----------------- |
| `INTERN`        | Estágio           |
| `JUNIOR`        | Júnior            |
| `MID`           | Pleno             |
| `SENIOR`        | Sênior            |

**Modelo de trabalho (`WORK_MODEL`)**

| Código    | Significado |
| --------- | ----------- |
| `REMOTE`  | Remoto      |
| `HYBRID`  | Híbrido     |
| `ONSITE`  | Presencial  |

**Status (`STATUS`)**

Fluxo típico:

```text
SAVED → APPLIED → INTERVIEW → TECHNICAL_TEST → APPROVED
                                              ↘ REJECTED
```

| Código            | Significado    |
| ----------------- | -------------- |
| `SAVED`           | Salvo          |
| `APPLIED`         | Candidatura    |
| `INTERVIEW`       | Entrevista     |
| `TECHNICAL_TEST`  | Teste técnico  |
| `APPROVED`        | Aprovado       |
| `REJECTED`        | Rejeitado      |

`REJECTED` pode ocorrer em qualquer etapa após a candidatura.

### 4.5 Views

Definidas em `Database/VIEW/SQL-SELECTS-VIEWS-FILTROS.sql`.

| View           | Uso                                      |
| -------------- | ---------------------------------------- |
| `ViewGetAll`   | Listagem completa, mais recentes primeiro (`ORDER BY APPLICATION_DATE DESC`) |
| `ViewFiltroOne`| Recorte de colunas para filtro e pesquisa |

`ViewGetAll` **não inclui** `ID_USER_FK`. Quando as rotas existirem, listagens por usuário autenticado devem filtrar pela FK (na view, na query ou em uma view nova).

O arquivo de views começa com fence Markdown (`` ```sql ``). Ao executar no PostgreSQL, use só o SQL, sem esses delimitadores.

### 4.6 Dados de teste

`Database/INSERTS/SQLS-INSERTS-Base-Teste.sql` cria 5 usuários e 5 candidaturas (Nubank, TOTVS, Itaú, Microsoft, Mercado Livre), com status e salários variados para exercitar filtros.

---

## 5. Backend

### 5.1 Dependências (`Backend/package.json`)

| Pacote           | Papel                         |
| ---------------- | ----------------------------- |
| `express`        | Servidor HTTP                 |
| `pg`             | Driver PostgreSQL             |
| `dotenv`         | Variáveis de ambiente         |
| `cors`           | CORS (ainda não ligado no `app.js`) |
| `bcrypt`         | Hash de senha (previsto)      |
| `jsonwebtoken`   | JWT (previsto)                |

Não há `npm start` definido; a execução atual é `node src/app.js`.

### 5.2 Configuração

Copiar `Backend/.env.example` para `Backend/.env`:

| Variável       | Uso                    |
| -------------- | ---------------------- |
| `DB_USER`      | Usuário PostgreSQL     |
| `DB_HOST`      | Host (ex.: `localhost`)|
| `DB_NAME`      | Nome do banco          |
| `DB_PASSWORD`  | Senha                  |
| `DB_PORT`      | Porta (padrão `5432`)  |
| `JWT_SECRET`   | Segredo do JWT         |
| `PORT`         | Porta da API (`3000`)  |
| `NODE_ENV`     | Ambiente               |

A conexão está em `Backend/src/config/database.js` (`Pool` do `pg`). Na subida, o processo tenta conectar e registra sucesso ou erro no console.

### 5.3 Servidor (`app.js`)

Hoje só existe:

- `GET /` — JSON de saúde (`mensagem`, `versao`, `ambiente`, `banco`).

`express.json()`, CORS, rotas de autenticação e de candidaturas **não** estão ativos.

### 5.4 Models

Os models encapsulam SQL. **Ainda não são usados por rotas.**

**Usuário (`UserModels.js`)** — operações previstas:

- `createUser`
- `FindById`
- `FindByEmail`
- `FindByAll`
- `UptadeUser`
- `DeleteUser`

**Candidatura (`ApplicationModels.js`)** — operações previstas:

- `create`
- `FindById` / `FindByUserId`
- `update` / `DeleteApplications`
- `GetAllplicationsALL` (via `ViewGetAll`)
- `GetCompany`
- `GetFiltrosOne` (via `ViewFiltroOne`)

Alguns trechos dos models ainda precisam de revisão (SQL, placeholders `$n` e retorno de `rows`) antes de ligar controllers.

### 5.5 API prevista (não implementada)

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/users/...          # perfil
PUT    /api/users/...
DELETE /api/users/...

GET    /api/applications
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id

GET    /api/applications/filters?...
GET    /api/applications/search?q=
```

Rotas de negócio devem exigir JWT válido.

Autenticação prevista:

```text
Cadastro/login → validar credenciais (bcrypt)
              → emitir JWT
              → frontend envia Authorization: Bearer <token>
              → middleware valida e injeta o usuário na request
```

---

## 6. Filtros e ordenação (produto)

Referência: `NOTIONS/Filters.txt`.

**Filtros:** status, nível, modelo de trabalho, empresa, cargo, setor, cidade, plataforma, salário (mín/máx), data da candidatura (início/fim).

**Ordenação:** mais recente, mais antiga, maior salário, menor salário.

A API deve expor isso com query params estáveis, por exemplo:

```text
GET /api/applications/filters?status=APPLIED&level=JUNIOR&work_model=HYBRID&company=Nubank
GET /api/applications/search?q=backend
```

---

## 7. Frontend

Stack atual: **React 19**, **Vite 8**, **oxlint**. `App.jsx` está vazio; `main.jsx` só monta o React.

Planejado (ainda não instalado no `package.json`): **Tailwind CSS** e **React Icons**.

Telas previstas:

1. Cadastro e login, persistência de sessão, rotas protegidas.
2. Perfil: ver, editar, excluir conta.
3. Candidaturas: CRUD, detalhe, mudança de status, filtros.
4. Dashboard: totais por status, recentes, resumo do usuário.

Estrutura de pastas prevista em `Frontend/src/`: `assets`, `components`, `pages`, `layouts`, `services`, `hooks`, `contexts`, `routes`, `utils`.

---

## 8. Como executar

Pré-requisito: Node.js, npm e PostgreSQL locais.

### 8.1 Banco

1. Criar o banco no PostgreSQL.
2. Rodar `Database/TABLE/TABLES_DATA_BASE.sql`.
3. Rodar o conteúdo SQL de `Database/VIEW/SQL-SELECTS-VIEWS-FILTROS.sql` (sem o fence Markdown).
4. Opcional: `Database/INSERTS/SQLS-INSERTS-Base-Teste.sql`.

### 8.2 Backend

```bash
cd Backend
cp .env.example .env
# preencher .env
npm install
node src/app.js
```

API em `http://localhost:3000`. Conferir com `GET /`.

### 8.3 Frontend

```bash
cd Frontend
npm install
npm run dev
```

O Vite sobe o template; ainda não há telas do JobFlow.

---

## 9. O que já está feito vs. o que falta

**Feito**

- [x] Esquema `Users` + `Applications` com `CHECK` de domínio
- [x] Views de listagem e recorte para filtro
- [x] Inserts de teste
- [x] Pool de conexão Node ↔ PostgreSQL
- [x] Rascunho dos models
- [x] Express com rota de saúde
- [x] Dependências de JWT, bcrypt e CORS no backend
- [x] Scaffold React + Vite

**Falta (prioridade sugerida)**

1. Corrigir e fechar os models; não devolver hash de senha nas listagens.
2. Camadas: routes, controllers, services, middlewares.
3. Auth: register, login, JWT, rotas protegidas (candidaturas só do usuário logado).
4. CRUD de candidaturas na API + filtros/busca.
5. Frontend: Tailwind, rotas, login, listagem, formulário, dashboard.
6. CORS e `express.json()` no `app.js`.
7. Scripts `start`/`dev` no backend; proxy Vite → API, se fizer sentido.

Fluxo de git (anotação em `NOTIONS/TemQueFazerIssoAe.txt`): branch por feature/fix e descrições claras no que foi alterado.

---

## 10. Glossário rápido

| Termo          | Significado                                              |
| -------------- | -------------------------------------------------------- |
| Candidatura    | Registro em `Applications`                               |
| Status         | Etapa do processo (`SAVED` … `REJECTED`)                 |
| View           | Consulta nomeada no PostgreSQL                           |
| JWT            | Token de sessão após o login                             |
| Model          | Módulo Node que executa SQL via `pg`                     |

---

Projeto pessoal, em andamento, usado como prática de API REST, autenticação, PostgreSQL e organização em camadas.
