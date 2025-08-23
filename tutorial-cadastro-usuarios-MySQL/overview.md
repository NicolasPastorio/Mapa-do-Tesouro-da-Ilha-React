
# Visão Geral do Projeto

Este projeto tem como objetivo demonstrar a criação de uma solução completa de cadastro de usuários, composta por:

- **API RESTful:** Desenvolvida com Node.js e Express, utilizando MySQL como banco de dados, com foco em segurança e criptografia.
- **Frontend Web:** Uma aplicação web construída com React, que consumirá a API para realizar o cadastro e login de usuários.
- **Aplicativo Mobile Nativo (Android):** Um aplicativo Android desenvolvido em Kotlin, que também consumirá a API.
- **Aplicativo Mobile Multiplataforma:** Um aplicativo desenvolvido com React Native e Expo Go, consumindo a mesma API.

## Tecnologias Utilizadas

### Backend (API REST)
- **Linguagem:** Node.js
- **Framework:** Express.js
- **Banco de Dados:** MySQL
- **ORM/Driver:** `mysql2` (ou Sequelize, dependendo da complexidade)
- **Segurança:** `bcrypt` para criptografia de senhas, `jsonwebtoken` para autenticação JWT.

### Frontend Web (React)
- **Framework:** React.js
- **Gerenciamento de Estado:** Context API ou Redux (se necessário)
- **Requisições HTTP:** Axios
- **Estilização:** CSS puro ou Styled Components/Tailwind CSS

### Aplicativo Mobile Nativo (Android)
- **Linguagem:** Kotlin
- **IDE:** Android Studio
- **Requisições HTTP:** Retrofit
- **JSON Parsing:** GSON ou Moshi

### Aplicativo Mobile Multiplataforma (React Native)
- **Framework:** React Native
- **Ambiente de Desenvolvimento:** Expo Go
- **Requisições HTTP:** Axios ou Fetch API

## Estrutura de Pastas (Sugestão)

```
. (raiz do projeto)
├── backend/ (API Node.js)
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   ├── routes/
│   │   ├── services/
│   │   └── app.js
│   ├── config/
│   ├── database/
│   ├── .env
│   └── package.json
├── frontend-web/ (Aplicação React)
│   ├── public/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   ├── App.js
│   │   └── index.js
│   ├── .env
│   └── package.json
├── mobile-android/ (Aplicativo Android Nativo)
│   ├── app/
│   │   ├── src/
│   │   │   ├── main/
│   │   │   │   ├── java/com/example/appname/
│   │   │   │   │   ├── activities/
│   │   │   │   │   ├── api/
│   │   │   │   │   ├── models/
│   │   │   │   │   └── MainActivity.kt
│   │   └── AndroidManifest.xml
│   └── build.gradle
├── mobile-react-native/ (Aplicativo React Native)
│   ├── assets/
│   ├── components/
│   ├── screens/
│   ├── App.js
│   ├── app.json
│   └── package.json
├── docs/
│   ├── overview.md
│   ├── api-rest.md
│   ├── frontend-web.md
│   ├── mobile-android.md
│   ├── mobile-react-native.md
│   └── security.md
└── todo.md
```

## Modelo de Dados (Usuário)

Para o cadastro de usuário, a tabela `users` no MySQL terá a seguinte estrutura:

- `id` (INT, PRIMARY KEY, AUTO_INCREMENT)
- `username` (VARCHAR(255), UNIQUE, NOT NULL)
- `email` (VARCHAR(255), UNIQUE, NOT NULL)
- `password` (VARCHAR(255), NOT NULL) - Armazenará o hash da senha
- `created_at` (TIMESTAMP, DEFAULT CURRENT_TIMESTAMP)

Esta estrutura básica será expandida com as implementações de segurança e criptografia nas fases posteriores.

