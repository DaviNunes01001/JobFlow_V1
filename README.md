# JobFlow_V1 — Gerenciador de Vagas e Candidaturas

![Status](https://img.shields.io/badge/status-em%20desenvolvimento-yellow)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript\&logoColor=black)
![Node.js](https://img.shields.io/badge/Node.js-339933?logo=node.js\&logoColor=white)
![Express](https://img.shields.io/badge/Express-000000?logo=express\&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?logo=postgresql\&logoColor=white)
![React](https://img.shields.io/badge/React-20232A?logo=react\&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite\&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-autenticação%20planejada-purple)
![bcrypt](https://img.shields.io/badge/bcrypt-segurança%20de%20senhas-orange)

---

## Sobre

Documentação completa em MD: [`DOCUMENTACAO.md`](./DOCUMENTACAO.md).
Documentação completa em Docs: [`DOCUMENTAÇÃO jOBFLOW_V1`](https://docs.google.com/document/d/1fdwRsgpKD-FJLpxf9oLb2CsidAn5bwg3zb60Gg5LsEw/edit?usp=sharing).

O **JobFlow** é uma plataforma web para gerenciamento de vagas de emprego e acompanhamento de candidaturas.

A ideia é pessoal e o projeto existe como **estudo prático de desenvolvimento Full Stack**: organizar, em um só lugar, as vagas encontradas, os dados da empresa, o cargo, o andamento do processo seletivo e os contatos relacionados à candidatura.

O sistema permite estruturar informações como empresa, cargo, nível, modelo de trabalho, salário, recrutador, status e data da candidatura.

O projeto **ainda está em desenvolvimento**. A estrutura do backend e as operações relacionadas às candidaturas já estão sendo implementadas, enquanto a autenticação JWT e a integração completa com o frontend ainda estão em desenvolvimento.

A aplicação é Full Stack, utilizando React (Vite) no frontend, Node.js/Express no backend e PostgreSQL como banco de dados relacional.

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
* Datas das candidaturas;
* Filtros acumulativos;
* Busca e organização das candidaturas.

---

# Estrutura

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
│   │   │   ├── applicationController.js
│   │   │   ├── authController.js
│   │   │   └── userController.js
│   │   │
│   │   ├── middleware
│   │   │   ├── authMiddleware.js
│   │   │   └── errorMiddleware.js
│   │   │
│   │   ├── models
│   │   │   ├── ApplicationModels.js
│   │   │   └── UserModels.js
│   │   │
│   │   ├── routes
│   │   │   ├── applicationRoutes.js
│   │   │   ├── authRoutes.js
│   │   │   └── userRoutes.js
│   │   │
│   │   ├── services
│   │   │   └── authServices.js
│   │   │
│   │   ├── utils
│   │   │   ├── generateToken.js
│   │   │   └── validators.js
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
├── .gitignore
└── README.md
```

---

# Tecnologias

| Tecnologia | Utilização                          |
| ---------- | ----------------------------------- |
| React      | Interface do usuário                |
| Vite       | Build e servidor de desenvolvimento |
| JavaScript | Linguagem principal                 |
| Node.js    | Ambiente de execução do backend     |
| Express    | Criação da API REST                 |
| PostgreSQL | Banco de dados relacional           |
| pg         | Conexão com PostgreSQL              |
| bcrypt     | Hash de senhas                      |
| JWT        | Autenticação e autorização          |
| Git        | Controle de versão                  |
| GitHub     | Hospedagem do projeto               |

---

# Backend

O backend está sendo organizado em camadas, separando responsabilidades entre rotas, middlewares, controllers, models e serviços específicos de autenticação.

A arquitetura atual segue:

```text
Routes
   ↓
Middlewares
   ↓
Controllers
   ↓
Models
   ↓
Database
```

Para autenticação, existe uma camada adicional de serviço:

```text
AuthController
   ↓
AuthService
   ↓
UserModels
   ↓
Database
```

## Responsabilidade das camadas

### Routes

Responsáveis por definir os endpoints da API e direcionar cada requisição para o controller correspondente.

### Middlewares

Responsáveis por processos executados antes dos controllers.

Entre eles está o middleware de autenticação, que será responsável por validar o JWT antes do acesso às rotas protegidas.

### Controllers

Responsáveis por receber:

* `req`
* `res`
* `next`

Os controllers recebem a requisição, chamam a operação necessária e retornam a resposta HTTP.

### Models

Responsáveis pelas operações diretamente relacionadas ao banco de dados.

Atualmente existem models para:

* Usuários;
* Candidaturas.

### Services

A camada `services` está sendo utilizada para a lógica de autenticação.

O `authServices.js` será responsável por concentrar regras como:

* cadastro;
* login;
* validação de credenciais;
* utilização do bcrypt;
* geração do JWT.

Não foi criada uma camada de `applicationsServices`, mantendo as operações de candidaturas diretamente entre Controller e Model.

### Utils

Contém funções auxiliares reutilizáveis.

O `generateToken.js` será responsável pela geração do JWT.

---

# Banco de Dados

O banco de dados utiliza **PostgreSQL**.

O modelo possui duas entidades principais:

```text
Users
   │
   │ ID_USER_FK
   ▼
Applications
```

Não existe uma tabela separada para empresas ou vagas.

Os dados relacionados à oportunidade ficam registrados diretamente em `Applications`.

Entre os dados armazenados estão:

* Empresa;
* Setor;
* LinkedIn da empresa;
* Cidade;
* Plataforma;
* Cargo;
* Nível;
* Modelo de trabalho;
* Data da candidatura;
* Status;
* Recrutador;
* Contato;
* Salário;
* URL da vaga;
* Observações.

## Campos de domínio

### Nível

```text
INTERN
JUNIOR
MID
SENIOR
```

### Modelo de trabalho

```text
REMOTE
HYBRID
ONSITE
```

### Status

```text
SAVED
APPLIED
INTERVIEW
TECHNICAL_TEST
APPROVED
REJECTED
```

---

# Models de Applications

O `ApplicationModels.js` já possui operações para manipulação das candidaturas.

## Criar candidatura

```text
create(application)
```

Insere uma nova candidatura no banco e retorna o registro criado.

## Buscar por ID

```text
FindById(id)
```

Busca uma candidatura específica através de `ID_APP`.

## Atualizar candidatura

```text
update(id, application)
```

Atualiza os dados da candidatura e atualiza `UPDATED_AT`.

## Excluir candidatura

```text
DeleteApplications(id)
```

Remove uma candidatura através de seu ID.

## Buscar todas

```text
GetAllplicationsALL()
```

Realiza a consulta utilizando a `ViewGetAll`.

## Filtro dinâmico

```text
QueryDinamicaFindFilters(filters)
```

Essa função foi criada para permitir **filtros acumulativos**.

Os filtros podem ser adicionados conforme os parâmetros recebidos.

Atualmente são considerados:

```text
Status
Nível
Modelo de trabalho
Empresa
Setor
Cidade
Plataforma
Salário mínimo
Salário máximo
```

A consulta é construída dinamicamente utilizando parâmetros do PostgreSQL:

```sql
WHERE 1 = 1
AND STATUS = $1
AND LEVEL = $2
AND WORK_MODEL = $3
```

Os filtros não escolhidos não são adicionados à consulta.

Também é utilizada ordenação por data:

```sql
ORDER BY APPLICATION_DATE DESC
```

Assim, o sistema pode receber diferentes combinações de filtros sem precisar criar uma query separada para cada combinação.

---

# Filtros

O sistema está sendo estruturado para permitir uma interface de filtros acumulativos.

Exemplo:

```text
Status: APPLIED
Nível: JUNIOR
Modelo: REMOTE
Cidade: São Paulo
Salário mínimo: 4000
Salário máximo: 7000
```

A consulta poderá ser construída com todas essas condições:

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

O `SELECT *` permite retornar todas as informações das candidaturas que atenderem aos filtros.

O `WHERE` determina **quais registros serão retornados**, enquanto o `SELECT` determina **quais colunas serão retornadas**.

---

# Autenticação

A autenticação está sendo estruturada utilizando **JWT (JSON Web Token)**.

A arquitetura prevista possui:

```text
Usuário
   ↓
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

Após a validação das credenciais:

```text
AuthService
   ↓
bcrypt
   ↓
generateToken.js
   ↓
JWT
   ↓
Frontend
```

A chave secreta será armazenada no `.env` através de:

```env
JWT_SECRET=...
```

O JWT será posteriormente utilizado pelo `authMiddleware.js` para proteger rotas da API.

Fluxo previsto:

```text
Frontend
   ↓
Login
   ↓
API
   ↓
Validação das credenciais
   ↓
Geração do JWT
   ↓
Frontend armazena o token
   ↓
Requisição autenticada
   ↓
authMiddleware
   ↓
Controller
```

A autenticação ainda está **em implementação**.

---

# Autorização por usuário

Um dos objetivos da autenticação é utilizar o ID do usuário obtido através do JWT para controlar o acesso às candidaturas.

Após validar o token, o middleware poderá disponibilizar o usuário através de:

```javascript
req.user
```

Por exemplo:

```javascript
req.user.idUser
```

Esse ID poderá ser utilizado nas consultas de `Applications` para garantir que o usuário tenha acesso somente às suas próprias candidaturas.

Exemplo:

```sql
SELECT *
FROM Applications
WHERE ID_USER_FK = $1;
```

Essa etapa faz parte da implementação da autenticação e autorização do sistema.

---

# Status das candidaturas

O fluxo principal planejado é:

```text
Salvo
(SAVED)
   ↓
Candidatura enviada
(APPLIED)
   ↓
Entrevista
(INTERVIEW)
   ↓
Teste técnico
(TECHNICAL_TEST)
   ↓
Aprovado
(APPROVED)
```

Também existe o estado:

```text
Rejeitado
(REJECTED)
```

Os filtros poderão utilizar esses estados para mostrar somente candidaturas de determinado estágio.

Exemplo:

```sql
SELECT *
FROM Applications
WHERE STATUS = 'APPLIED';
```

---

# API

A API está sendo organizada nos seguintes grupos:

```text
/api/auth
/api/users
/api/applications
```

Endpoints planejados:

```text
POST   /api/auth/register
POST   /api/auth/login

GET    /api/users
GET    /api/users/:id
PUT    /api/users/:id
DELETE /api/users/:id

GET    /api/applications
GET    /api/applications/:id
POST   /api/applications
PUT    /api/applications/:id
DELETE /api/applications/:id

GET    /api/applications/filters
```

Exemplo de utilização dos filtros:

```text
GET /api/applications/filters?status=APPLIED&level=JUNIOR
```

Outros parâmetros previstos:

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

# Principais funcionalidades

## Implementado

* [x] Estrutura inicial do banco PostgreSQL
* [x] Tabela `Users`
* [x] Tabela `Applications`
* [x] Relacionamento entre usuários e candidaturas
* [x] Views SQL
* [x] Conexão Node.js ↔ PostgreSQL
* [x] Model de usuários
* [x] Model de candidaturas
* [x] Criação de candidaturas
* [x] Busca de candidatura por ID
* [x] Atualização de candidaturas
* [x] Exclusão de candidaturas
* [x] Consulta geral de candidaturas
* [x] Estrutura de filtro dinâmico
* [x] Filtros acumulativos por múltiplos parâmetros
* [x] Filtro de salário mínimo
* [x] Filtro de salário máximo
* [x] Estrutura inicial de Controllers
* [x] Estrutura de Routes
* [x] Estrutura de Middleware
* [x] Estrutura de Service para autenticação
* [x] Estrutura de geração de JWT

## Em desenvolvimento

* [ ] Cadastro de usuário completo
* [ ] Login completo
* [ ] Hash de senha com bcrypt integrado ao fluxo
* [ ] Emissão de JWT
* [ ] Validação de JWT pelo middleware
* [ ] Proteção das rotas
* [ ] Associação automática das candidaturas ao usuário autenticado
* [ ] Filtros integrados às rotas
* [ ] Busca de candidaturas
* [ ] Integração completa entre frontend e backend
* [ ] Interface de gerenciamento das candidaturas
* [ ] Dashboard
* [ ] Controle de perfil

---

# Execução

Copie:

```text
Backend/.env.example
```

para:

```text
Backend/.env
```

Configure as informações do PostgreSQL e as variáveis de ambiente necessárias.

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

## Banco de dados

Execute os scripts SQL:

```text
Database/
├── TABLE/
├── VIEW/
└── INSERTS/
```

## Backend

```bash
cd Backend
npm install
node src/app.js
```

Por padrão:

```text
http://localhost:3000
```

## Frontend

```bash
cd Frontend
npm install
npm run dev
```

---

# Organização geral

O projeto segue a separação:

```text
                         FRONTEND
                            │
                            │ HTTP / JSON
                            ▼
                         ROUTES
                            │
                            ▼
                       MIDDLEWARE
                            │
                            ▼
                       CONTROLLER
                       /         \
                      /           \
                     ▼             ▼
               AUTH SERVICE      MODEL
                     │             │
                     ▼             ▼
                   JWT         PostgreSQL
```

Para candidaturas:

```text
ApplicationRoutes
       ↓
ApplicationController
       ↓
ApplicationModels
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

AuthService
       ↓
generateToken
       ↓
JWT
```

---

# Próximas etapas

A ordem de desenvolvimento prevista é:

```text
1. Finalizar UserModels
        ↓
2. Finalizar AuthService
        ↓
3. Finalizar AuthController
        ↓
4. Finalizar generateToken
        ↓
5. Finalizar authMiddleware
        ↓
6. Proteger ApplicationRoutes
        ↓
7. Associar candidaturas ao usuário autenticado
        ↓
8. Finalizar filtros
        ↓
9. Integrar frontend
        ↓
10. Criar interface do JobFlow
        ↓
11. Dashboard
```

---

> Projeto pessoal em desenvolvimento, criado como estudo prático de desenvolvimento Full Stack, com foco em APIs REST, PostgreSQL, autenticação, organização em camadas, filtros dinâmicos e integração entre frontend e backend.
