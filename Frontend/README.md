# Job Management System — Frontend

Frontend da aplicação de gerenciamento de candidaturas e vagas de emprego.

O projeto está sendo desenvolvido com React e será responsável pela interface de autenticação, gerenciamento de candidaturas e visualização das informações do usuário.

## Tecnologias

- React
- Vite
- JavaScript
- Tailwind CSS
- React Icons

## Estrutura atual

No momento, o projeto contém apenas o template inicial criado com React + Vite.

A estrutura será organizada conforme o desenvolvimento das funcionalidades:

src/
├── assets/
├── components/
├── pages/
├── layouts/
├── services/
├── hooks/
├── contexts/
├── routes/
├── utils/
├── App.jsx
└── main.jsx

## Funcionalidades planejadas

### Autenticação

- Cadastro de usuário
- Login
- Logout
- Persistência da autenticação
- Proteção de rotas
- Integração com JWT

### Usuário

- Visualização do perfil
- Edição dos dados do usuário
- Exclusão da conta

### Candidaturas

- Cadastro de candidatura
- Listagem de candidaturas
- Visualização dos detalhes
- Edição de candidatura
- Exclusão de candidatura
- Alteração do status da candidatura
- Filtros e organização das candidaturas

### Dashboard

- Resumo das candidaturas
- Quantidade por status
- Candidaturas recentes
- Informações gerais do usuário

## Estilização

A interface será desenvolvida utilizando **Tailwind CSS**.

O Tailwind será utilizado para:

- Layout
- Responsividade
- Espaçamentos
- Tipografia
- Cores
- Estados dos componentes
- Responsividade para diferentes dispositivos

## Ícones

Os ícones da aplicação serão implementados utilizando **React Icons**.

Exemplo:

```jsx
import { FaUser } from "react-icons/fa";

function Example() {
    return <FaUser />;
}
