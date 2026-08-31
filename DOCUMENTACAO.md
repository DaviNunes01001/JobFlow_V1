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
````

---

# Arquitetura do Backend

O backend está sendo organizado em camadas, com cada parte possuindo uma responsabilidade específica.

Para as operações de candidaturas:

```text
Routes
   ↓
Middleware
   ↓
Controller
   ↓
Model
   ↓
PostgreSQL
```

Para autenticação:

```text
AuthRoutes
   ↓
AuthController
   ↓
AuthService
   ↓
UserModels
   ↓
PostgreSQL
```

O `AuthService` também utiliza o `bcrypt` para trabalhar com as senhas e o `generateToken.js` para gerar o JWT.

## Responsabilidade das camadas

### Routes

Define os endpoints disponíveis na API e direciona as requisições para os controllers.

### Middleware

Executa verificações antes que a requisição chegue ao controller.

O principal middleware previsto é o `authMiddleware.js`, responsável por verificar o JWT enviado pelo usuário.

### Controllers

Responsáveis por receber as requisições HTTP, acessar os dados enviados pelo cliente e retornar as respostas da API.

### Models

Responsáveis pelas operações diretamente relacionadas ao banco de dados e pela execução das queries SQL.

### Services

A camada `services` será utilizada para regras de negócio relacionadas à autenticação.

No momento, existe:

```text
services/
└── AuthService.js
```

Não será criada uma camada `ApplicationService`. As operações de candidaturas permanecem organizadas entre Controller e Model.

### Utils

Contém funções auxiliares utilizadas pelo backend.

O arquivo:

```text
utils/
└── generateToken.js
```

é responsável pela geração do JWT.

---

# Tecnologias

| Tecnologia | Utilização                          |
| ---------- | ----------------------------------- |
| React      | Interface do usuário                |
| Vite       | Build e servidor de desenvolvimento |
| JavaScript | Linguagem principal                 |
| Node.js    | Ambiente de execução do backend     |
| Express    | Desenvolvimento da API REST         |
| PostgreSQL | Banco de dados relacional           |
| pg         | Driver de conexão com PostgreSQL    |
| bcrypt     | Hash e comparação de senhas         |
| JWT        | Autenticação e autorização          |
| Git        | Controle de versão                  |
| GitHub     | Hospedagem do projeto               |

---

# Banco de Dados

O banco de dados utiliza **PostgreSQL**.

O relacionamento principal é:

```text
Users (1)
   │
   │ ID_USER
   ▼
Applications (N)
       ID_USER_FK
```

Cada candidatura pertence a um usuário através de `ID_USER_FK`.

---

## Tabela Users

| Coluna           | Tipo           | Observação               |
| ---------------- | -------------- | ------------------------ |
| `ID_USER`        | `SERIAL PK`    | Identificador do usuário |
| `NAME_USER`      | `VARCHAR(100)` | Nome do usuário          |
| `EMAIL`          | `VARCHAR(255)` | E-mail único             |
| `PASSOWORD_HASH` | `VARCHAR(255)` | Hash da senha            |
| `CREATE_AT`      | `TIMESTAMP`    | Data de criação          |
| `UPDATED_T`      | `TIMESTAMP`    | Data de atualização      |

> Os nomes das colunas seguem o esquema atual do banco. A coluna `PASSOWORD_HASH` mantém a grafia definida no SQL atual.

---

## Tabela Applications

| Coluna             | Tipo            | Observação                   |
| ------------------ | --------------- | ---------------------------- |
| `ID_APP`           | `SERIAL PK`     | Identificador da candidatura |
| `ID_USER_FK`       | `INT`           | Usuário proprietário         |
| `COMPANY`          | `VARCHAR(150)`  | Empresa                      |
| `SECTOR`           | `VARCHAR(150)`  | Setor                        |
| `COMPANY_LINKEDIN` | `VARCHAR(500)`  | LinkedIn da empresa          |
| `CITY`             | `VARCHAR(100)`  | Cidade                       |
| `PLATFORM`         | `VARCHAR(100)`  | Plataforma da vaga           |
| `JOB_TITLE`        | `VARCHAR(150)`  | Cargo                        |
| `LEVEL`            | `VARCHAR(50)`   | Nível                        |
| `WORK_MODEL`       | `VARCHAR(30)`   | Modelo de trabalho           |
| `APPLICATION_DATE` | `DATE`          | Data da candidatura          |
| `STATUS`           | `VARCHAR(50)`   | Status                       |
| `RECRUITER`        | `VARCHAR(150)`  | Recrutador                   |
| `CONTACT`          | `VARCHAR(255)`  | Contato                      |
| `SALARY`           | `DECIMAL(10,2)` | Salário                      |
| `JOB_URL`          | `VARCHAR(500)`  | URL da vaga                  |
| `NOTES`            | `TEXT`          | Observações                  |
| `CREATED_AT`       | `TIMESTAMP`     | Data de criação              |
| `UPDATED_AT`       | `TIMESTAMP`     | Data de atualização          |

---

# Valores de domínio

## Nível

```text
INTERN
JUNIOR
MID
SENIOR
```

## Modelo de trabalho

```text
REMOTE
HYBRID
ONSITE
```

## Status

```text
SAVED
APPLIED
INTERVIEW
TECHNICAL_TEST
APPROVED
REJECTED
```

---

# Models

O projeto possui dois models principais:

```text
models/
├── UserModels.js
└── ApplicationModels.js
```

## UserModels

Responsável pelas operações relacionadas aos usuários e pelo acesso aos dados da tabela `Users`.

---

## ApplicationModels

Responsável pelas operações relacionadas às candidaturas.

Atualmente possui funções para:

### Criar candidatura

```javascript
create(application)
```

Insere uma nova candidatura no banco de dados e retorna o registro criado.

### Buscar candidatura por ID

```javascript
FindById(id)
```

Busca uma candidatura através de `ID_APP`.

### Atualizar candidatura

```javascript
update(id, application)
```

Atualiza os dados de uma candidatura e registra a alteração através de `UPDATED_AT`.

### Excluir candidatura

```javascript
DeleteApplications(id)
```

Exclui uma candidatura através de seu ID.

### Buscar todas as candidaturas

```javascript
GetAllplicationsALL()
```

Busca as candidaturas utilizando a view `ViewGetAll`.

### Filtro dinâmico

```javascript
QueryDinamicaFindFilters(filters)
```

Permite realizar filtros acumulativos utilizando diferentes parâmetros.

Atualmente estão previstos:

```text
status
level
workModel
company
sector
city
platform
minSalary
maxSalary
```

A query é construída dinamicamente utilizando parâmetros do PostgreSQL.

Exemplo:

```sql
SELECT *
FROM Applications
WHERE 1 = 1
  AND STATUS = $1
  AND LEVEL = $2
  AND WORK_MODEL = $3
ORDER BY APPLICATION_DATE DESC;
```

A utilização de `WHERE 1 = 1` permite adicionar novas condições com `AND` sem precisar verificar se aquela é a primeira condição da consulta.

Os valores são enviados separadamente através do array de parâmetros, evitando a concatenação direta dos valores na SQL.

---

# Filtros

O sistema utilizará filtros acumulativos.

Isso significa que o usuário poderá selecionar vários filtros simultaneamente.

Por exemplo:

```text
Status: APPLIED
Nível: JUNIOR
Modelo: REMOTE
Cidade: São Paulo
Salário mínimo: R$ 4.000
Salário máximo: R$ 7.000
```

A consulta será montada conforme os filtros selecionados:

```sql
SELECT *
FROM Applications
WHERE 1 = 1
  AND STATUS = $1
  AND LEVEL = $2
  AND WORK_MODEL = $3
  AND CITY = $4
  AND SALARY >= $5
  AND SALARY <= $6
ORDER BY APPLICATION_DATE DESC;
```

O `SELECT *` retorna todas as colunas das candidaturas que atenderem às condições.

---

# Views

O banco possui views utilizadas para consultas específicas.

## ViewGetAll

Utilizada para a listagem geral das candidaturas.

## ViewFiltroOne

Utilizada como base para consultas relacionadas aos filtros e pesquisa.

As views ficam no arquivo:

```text
Database/VIEW/SQL-SELECTS-VIEWS-FILTROS.sql
```

---

# Autenticação

O JobFlow utilizará **JWT (JSON Web Token)** para autenticação.

Também será utilizado `bcrypt` para proteger as senhas armazenadas no banco.

O fluxo planejado é:

```text
Cadastro
   ↓
AuthController
   ↓
AuthService
   ↓
bcrypt
   ↓
UserModels
   ↓
PostgreSQL
```

No login:

```text
Login
   ↓
AuthController
   ↓
AuthService
   ↓
UserModels
   ↓
bcrypt.compare()
   ↓
generateToken.js
   ↓
JWT
   ↓
Frontend
```

A chave utilizada para assinar os tokens será armazenada no `.env`:

```env
JWT_SECRET=sua_chave_secreta
```

---

# Middleware de autenticação

O arquivo:

```text
middleware/authMiddleware.js
```

será responsável por validar o JWT enviado nas requisições protegidas.

O fluxo será:

```text
Frontend
   ↓
Authorization: Bearer <token>
   ↓
authMiddleware
   ↓
Validação do JWT
   ↓
req.user
   ↓
Controller
```

O usuário autenticado poderá ser identificado através de:

```javascript
req.user.idUser
```

Esse ID será utilizado posteriormente para garantir que cada usuário tenha acesso somente às suas próprias candidaturas.

Exemplo:

```sql
SELECT *
FROM Applications
WHERE ID_USER_FK = $1;
```

---

# API

Os endpoints estão sendo estruturados nos seguintes grupos:

```text
/api/auth
/api/users
/api/applications
```

## Autenticação

```text
POST /api/auth/register
POST /api/auth/login
```

## Usuários

```text
GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id
```

## Candidaturas

```text
GET    /api/applications
GET    /api/applications/:id
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id
```

## Filtros

```text
GET /api/applications/filters
```

Exemplo:

```text
GET /api/applications/filters?status=APPLIED&level=JUNIOR
```

Parâmetros previstos:

```text
status
level
workModel
company
sector
city
platform
minSalary
maxSalary
```

---

# Status das candidaturas

O fluxo principal do processo seletivo é representado por:

```text
SAVED
  ↓
APPLIED
  ↓
INTERVIEW
  ↓
TECHNICAL_TEST
  ↓
APPROVED
```

Também existe o estado:

```text
REJECTED
```

O status poderá ser alterado durante o acompanhamento da candidatura.

---

# Principais funcionalidades

## Implementado

* [x] Estrutura do banco PostgreSQL
* [x] Tabela `Users`
* [x] Tabela `Applications`
* [x] Relacionamento `Users → Applications`
* [x] Constraints `CHECK` para campos de domínio
* [x] Views SQL
* [x] Inserts para testes
* [x] Pool de conexão Node.js ↔ PostgreSQL
* [x] Model de usuários
* [x] Model de candidaturas
* [x] Criação de candidaturas
* [x] Busca por ID
* [x] Atualização de candidaturas
* [x] Exclusão de candidaturas
* [x] Consulta geral de candidaturas
* [x] Query dinâmica de filtros
* [x] Filtros acumulativos
* [x] Filtro de salário mínimo
* [x] Filtro de salário máximo
* [x] Estrutura de Controllers
* [x] Estrutura de Routes
* [x] Estrutura de Middleware
* [x] Estrutura de `AuthService`
* [x] Estrutura de geração de JWT
* [x] Dependências de JWT, bcrypt e CORS

## Em desenvolvimento

* [ ] Finalizar `UserModels`
* [ ] Finalizar cadastro de usuário
* [ ] Finalizar login
* [ ] Integrar bcrypt ao fluxo de autenticação
* [ ] Finalizar geração do JWT
* [ ] Finalizar `authMiddleware`
* [ ] Proteger as rotas
* [ ] Garantir que cada usuário acesse somente suas candidaturas
* [ ] Finalizar CRUD de candidaturas na API
* [ ] Integrar filtros às rotas
* [ ] Implementar busca
* [ ] Configurar `express.json()`
* [ ] Configurar CORS
* [ ] Integração frontend ↔ backend
* [ ] Construção das telas do JobFlow
* [ ] Login e cadastro no frontend
* [ ] Listagem de candidaturas
* [ ] Formulário de candidatura
* [ ] Dashboard
* [ ] Perfil do usuário

---

# Frontend

O frontend utiliza:

```text
React
Vite
JavaScript
```

A estrutura atual ainda está em desenvolvimento.

As telas previstas incluem:

1. Cadastro;
2. Login;
3. Listagem de candidaturas;
4. Cadastro de candidatura;
5. Edição de candidatura;
6. Detalhes da candidatura;
7. Filtros;
8. Perfil do usuário;
9. Dashboard.

A integração com a API será realizada através de requisições HTTP utilizando JSON.

---

# Execução

## Banco de dados

Crie o banco PostgreSQL e execute os scripts:

```text
Database/
├── TABLE/
│   └── TABLES_DATA_BASE.sql
│
├── VIEW/
│   └── SQL-SELECTS-VIEWS-FILTROS.sql
│
└── INSERTS/
    └── SQLS-INSERTS-Base-Teste.sql
```

Os inserts são opcionais e servem para adicionar dados de teste.

---

## Backend

Entre na pasta:

```bash
cd Backend
```

Instale as dependências:

```bash
npm install
```

Configure o arquivo:

```text
.env
```

A partir do `.env.example`.

Exemplo:

```env
PORT=3000

DB_USER=seu_usuario
DB_HOST=localhost
DB_NAME=JobFlow
DB_PASSWORD=sua_senha
DB_PORT=5432

JWT_SECRET=sua_chave_secreta
```

Execute:

```bash
node src/app.js
```

A API será executada, por padrão, em:

```text
http://localhost:3000
```

---

## Frontend

Entre na pasta:

```bash
cd Frontend
```

Instale as dependências:

```bash
npm install
```

Execute:

```bash
npm run dev
```

---

# Organização geral

A aplicação possui três partes principais:

```text
Frontend
   │
   │ HTTP / JSON
   ▼
Backend / API
   │
   │ SQL / pg
   ▼
PostgreSQL
```

No backend:

```text
Routes
   ↓
Middleware
   ↓
Controllers
   ↓
Models
   ↓
PostgreSQL
```

Na autenticação:

```text
AuthRoutes
   ↓
AuthController
   ↓
AuthService
   ↓
UserModels
   ↓
PostgreSQL

AuthService
   ↓
generateToken.js
   ↓
JWT
```

---

# Próximas etapas

A ordem de desenvolvimento planejada é:

```text
1. Finalizar UserModels
        ↓
2. Finalizar AuthService
        ↓
3. Finalizar AuthController
        ↓
4. Finalizar generateToken.js
        ↓
5. Finalizar authMiddleware
        ↓
6. Proteger ApplicationRoutes
        ↓
7. Associar candidaturas ao usuário autenticado
        ↓
8. Finalizar API de Applications
        ↓
9. Finalizar filtros e busca
        ↓
10. Integrar frontend
        ↓
11. Criar telas
        ↓
12. Dashboard
```

---

# Git

O desenvolvimento do projeto é organizado por branches de funcionalidade ou correção.

Exemplo:

```text
main
 │
 ├── feature/auth
 ├── feature/applications
 ├── feature/filters
 └── fix/...
```

As alterações devem possuir descrições claras sobre o que foi implementado ou corrigido.

---

# Glossário

| Termo          | Significado                                                |
| -------------- | ---------------------------------------------------------- |
| Candidatura    | Registro armazenado em `Applications`                      |
| Status         | Etapa atual do processo seletivo                           |
| View           | Consulta nomeada no PostgreSQL                             |
| Model          | Módulo responsável pelas operações no banco                |
| Controller     | Camada responsável pelas requisições HTTP                  |
| Middleware     | Função executada durante o processamento da requisição     |
| Service        | Camada responsável pelas regras de negócio da autenticação |
| JWT            | Token utilizado para autenticação                          |
| bcrypt         | Biblioteca utilizada para hash e comparação de senhas      |
| Query dinâmica | Consulta SQL construída de acordo com os filtros recebidos |

---

> Projeto pessoal em desenvolvimento, criado como estudo prático de Full Stack, com foco em API REST, PostgreSQL, autenticação JWT, segurança de senhas, filtros dinâmicos e organização de backend.

```
