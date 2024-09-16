<p align="center">
  <a href="" rel="noopener">
    <img width=200px height=200px src="https://i.imgur.com/6wj0hh6.jpg" alt="Logo do Projeto">
  </a>
</p>

<h3 align="center">Projeto Cadastro de Clientes</h3>

<div align="center">

[![Status](https://img.shields.io/badge/status-ativo-sucesso.svg)]()
[![Licença](https://img.shields.io/badge/licença-MIT-azul.svg)](/LICENSE)

</div>

---

<p align="center"> Este projeto contém um backend de API e uma aplicação frontend. 
    <br> 
</p>

## 📝 Tabela de Conteúdos

- [Sobre](#sobre)
- [Como Começar](#comecar)
  - [Backend - API](#backend)
  - [Frontend](#frontend)
- [Deploy](#deploy)
- [Uso](#uso)
- [Construído Com](#construido_com)
- [Autores](#autores)

## 🧐 Sobre <a name = "sobre"></a>

Projeto de Cadastro de Clientes.
Este projeto consiste em duas partes: um **backend** construído com Node.js e Express, e um **frontend** feito em React. O backend oferece uma API RESTful, e o frontend interage com essa API para exibir dados e lidar com interações do usuário. O banco de dados utilizado foi o MySQL.

## 🏁 Como Começar <a name = "comecar"></a>

Instruções de configuração dos projetos backend e frontend em sua máquina local para desenvolvimento e testes.

### Pré-requisitos

Você precisará ter o seguinte instalado em sua máquina:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) ou [yarn](https://yarnpkg.com/)
- [MySQL](https://www.mysql.com)

### Banco de dados - MySQL

Na raiz do projeto tem um dump do banco de dados(db.sql) utilizado, basta importar para o seu MySQL utilizando um SGBD de sua preferencia.

### Backend - API <a name="backend"></a>

O backend é uma API RESTful construída com Node.js e Express.

#### Instalando o Backend - API

1. Navegue até o diretório `api`.

```bash
cd api
```

2. Instale as dependências.
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo .env baseado no .env.example.
4. Inicie o servidor.
```bash
npm start
```
A API do backend estará rodando em http://localhost:8800.

### Frontend <a name="frontend"></a>

O frontend é uma aplicação React que interage com a API do backend.

#### Instalando o Frontend

1. Navegue até o diretório frontend.

```bash
cd frontend
```

2. Instale as dependências.
```bash
npm install
```

3. Configure as variáveis de ambiente criando um arquivo .env baseado no .env.example.
4. Inicie o servidor.
```bash
npm start
```
A API do backend estará rodando em http://localhost:3000.

## 🎈 Uso <a name="uso"></a>

- Inicie o MySQL.
- Acesse a API do backend em http://localhost:8800/api/clients (Doc Endpoints - pasta api/README).
- Acesse a aplicação frontend em http://localhost:3000.

## 🚀 Deploy <a name = "Deploy"></a>

### Deploy do Backend - API
1. Configure as variáveis de ambiente para o ambiente de produção.
2. Construa e faça o deploy do backend no provedor de hospedagem de sua preferência (ex: AWS, Heroku).

### Deploy do Frontend
1. Construa o frontend para produção.
```bash
npm run build
```
2. Faça o deploy da pasta build em um provedor de hospedagem.


## ⛏️ Construído Com <a name = "construido_com"></a>

### Backend
- [Express](https://expressjs.com) - Web Framework
- [NodeJs](https://nodejs.org/en/) - Server Environment
- [MySQL](https://www.mysql.com) - Database

### Frontend
- [React](https://react.dev) - Library for web
- [Chakra UI](https://v2.chakra-ui.com) - Framework de UI
- [Axios](https://axios-http.com/docs/intro) - Cliente HTTP


## ✍️ Autores <a name = "autores"></a>

- [@AguiarDG](https://github.com/AguiarDG)
